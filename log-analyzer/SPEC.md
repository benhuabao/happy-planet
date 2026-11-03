# API 日志分析工具：共享需求说明

纯 Java，无第三方依赖，无构建工具。JDK 22+ 运行：

```
cd log-analyzer
java Main.java                 # 默认读取 sample-access.log
java Main.java other.log
java LogAnalyzerCheck.java     # 自检：§5 验收 + 边界 + 随机对照，失败时退出码 1
```

## 1. 日志格式

每行一条请求，字段以空白分隔，共 5 个字段：

```
<时间> <方法> <路径> <状态码> <耗时ms>
2026-11-03T09:00:01 GET /api/users 200 120
```

| 字段 | 规则 |
|------|------|
| 时间 | ISO-8601 本地时间 `yyyy-MM-ddTHH:mm:ss`，能被 `LocalDateTime.parse` 解析 |
| 方法 | `GET` / `POST` / `PUT` / `DELETE` 等，原样保留，区分大小写 |
| 路径 | 以 `/` 开头；`?` 及之后的查询串**去掉**（`/api/orders?page=2` 记为 `/api/orders`） |
| 状态码 | 整数，100–599 |
| 耗时 | 非负整数，单位毫秒 |

解析规则（已在 `LogEntry.parse` 实现，三个分析器只接收 `List<LogEntry>`，不自己解析）：

- 空行、`#` 开头的行：忽略。
- 字段数不是 5、时间/数字解析失败、状态码越界、耗时为负、路径不以 `/` 开头：视为坏行，跳过，不参与任何统计。
- 有效行保持原始日志顺序。

## 2. 接口规范

共享契约（只读，见 §4）：

```java
public record LogEntry(LocalDateTime time, String method, String path, int status, long durationMs) {
    public String endpoint();                              // "GET /api/users"
    public static LogEntry parse(String line);             // 坏行返回 null
    public static List<LogEntry> parseAll(List<String> lines);
}
```

三个分析器都是 `public class` + `public static` 方法，方法签名已在骨架文件中给出，**不得修改签名**，可新增 `private` 辅助方法。

| 分析器 | 方法 | 返回 |
|--------|------|------|
| `StatusCodeAnalyzer` | `countByStatus(entries)` | `Map<Integer,Integer>`，按状态码升序，只含出现过的状态码 |
| | `countByClass(entries)` | `Map<String,Integer>`，固定 5 个键 `1xx`…`5xx`，按此顺序，0 也保留 |
| | `errorRatePercent(entries)` | `double`，(4xx+5xx)/总数×100；空输入返回 0.0 |
| | `report(entries)` | `String`，格式见 §3.1 |
| `LatencyAnalyzer` | `average(entries)` | `double`，耗时算术平均；空输入 0.0 |
| | `p95(entries)` | `long`，最近秩法（见 §3.2）；空输入 0 |
| | `slowRequests(entries)` | `List<LogEntry>`，`durationMs >= SLOW_THRESHOLD_MS(1000)`，保持日志原顺序 |
| | `report(entries)` | `String`，格式见 §3.2 |
| `TopEndpointAnalyzer` | `top3(entries)` | `List<Map.Entry<String,Integer>>`，最多 3 项 |
| | `report(entries)` | `String`，格式见 §3.3 |

通用约定：

- 入参不会是 `null`，可能是空列表；不得修改入参列表。
- `report` 返回多行文本，行间用 `\n`，**末尾不带换行**（`Main` 用 `println` 输出）。
- 小数格式统一 `String.format(Locale.ROOT, "%.2f", x)`（保留 2 位，四舍五入）。

## 3. 统计规则与输出格式

### 3.1 HTTP 状态码统计（Agent A，`StatusCodeAnalyzer.java`）

- 按具体状态码计数；按类别 `status / 100` 归入 `1xx`…`5xx`。
- 错误率 = (4xx + 5xx) / 有效请求总数 × 100。3xx 不算错误。

```
[Status] total=<总数>
<状态码>=<次数>          （每个出现过的状态码一行，升序）
classes: 1xx=<n> 2xx=<n> 3xx=<n> 4xx=<n> 5xx=<n>
error rate: <x.xx>%
```

空输入：`[Status] total=0`，无状态码行，classes 全 0，`error rate: 0.00%`。

### 3.2 请求耗时分析（Agent B，`LatencyAnalyzer.java`）

- 平均值：所有有效请求 `durationMs` 的算术平均。
- P95：**最近秩法**，耗时升序排序后取下标 `ceil(0.95 * n) - 1` 的元素。不做插值。
- 慢请求：`durationMs >= 1000`（等于 1000 也算慢），按日志原顺序列出。

```
[Latency] avg=<x.xx>ms p95=<n>ms slow(>=1000ms)=<慢请求数>
slow: <方法> <路径> <状态码> <耗时>ms     （每个慢请求一行，无慢请求则无此行）
```

空输入：`[Latency] avg=0.00ms p95=0ms slow(>=1000ms)=0`。

### 3.3 接口访问量 TOP 3（Agent C，`TopEndpointAnalyzer.java`）

- 接口 = `LogEntry.endpoint()`，即 `方法 + 空格 + 路径`（同路径不同方法算不同接口；查询串已被去掉）。
- 所有有效请求都计数，不论状态码。
- 排序：次数降序；次数相同按接口字符串升序（`String.compareTo`）。取前 3；不足 3 个全部返回。

```
[Top3]
1. <接口> <次数>
2. <接口> <次数>
3. <接口> <次数>
```

空输入：只有 `[Top3]` 一行。

## 4. 分工与文件归属

| 角色 | 分支 | 只允许修改 |
|------|------|-----------|
| Agent A | `feat/log-status` | `log-analyzer/StatusCodeAnalyzer.java` |
| Agent B | `feat/log-latency` | `log-analyzer/LatencyAnalyzer.java` |
| Agent C | `feat/log-top3` | `log-analyzer/TopEndpointAnalyzer.java` |
| Review Agent | `review/log-analyzer` | 不写业务代码；合并 A/B/C 分支做集成验证，问题反馈给对应 Agent |

共享只读文件：`SPEC.md`、`LogEntry.java`、`Main.java`、`sample-access.log`。需要改共享文件时，先在 `health-condition` 上改并提交，各分支再同步，不在功能分支上直接改。

所有分支不推送远程，不合并到 `main` / `master` / `test`。

## 5. 验收：sample-access.log 期望结果

样例共 24 行：1 行注释、1 行空行、2 行坏行（`this line is broken`、耗时为 `abc`），有效 20 行。
覆盖的边界：查询串去除、耗时恰好 1000 与 999、TOP 3 并列排序、3xx 不计入错误率。

`java Main.java` 在三个分支全部合并后的完整输出必须**逐字**等于：

```
=== API Log Report === valid=20
[Status] total=20
200=12
201=2
204=1
304=1
401=1
404=1
500=1
503=1
classes: 1xx=0 2xx=15 3xx=1 4xx=2 5xx=2
error rate: 20.00%
[Latency] avg=400.20ms p95=1500ms slow(>=1000ms)=3
slow: GET /api/products 200 1000ms
slow: GET /api/users 500 2300ms
slow: POST /api/orders 503 1500ms
[Top3]
1. GET /api/users 7
2. GET /api/products 4
3. GET /api/orders 3
```

说明：

- 平均值 8004 / 20 = 400.20。
- P95：n=20，下标 ceil(19) - 1 = 18，升序第 19 个 = 1500（插值法会得到 1540，属于错误实现）。
- 第 3 名：`GET /api/orders` 和 `POST /api/orders` 都是 3 次，按字符串升序取 `GET`。若没去掉查询串，`GET /api/orders` 只有 2 次，会错误地选中 `POST`。

## 6. Review 检查清单

1. 每个功能分支只改了自己的文件（`git diff health-condition --stat`）。
2. 签名与 §2 一致，无新增依赖。
3. 三个分支合并到 `review/log-analyzer` 无冲突，`java Main.java` 输出与 §5 逐字一致。
4. 空列表输入不抛异常，输出符合各节“空输入”格式。
5. 边界：耗时 1000 算慢、999 不算；P95 用最近秩法；TOP 3 并列按字符串升序。

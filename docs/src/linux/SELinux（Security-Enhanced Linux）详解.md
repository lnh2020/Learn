<font style="color:rgb(0, 0, 0);background-color:rgb(252, 252, 252);">SELinux 是 </font>**<font style="color:rgb(0, 0, 0);background-color:rgb(252, 252, 252);">Security-Enhanced Linux</font>**<font style="color:rgb(0, 0, 0);background-color:rgb(252, 252, 252);"> 的缩写，是 Linux 系统中基于 </font>**<font style="color:rgb(0, 0, 0);background-color:rgb(252, 252, 252);">强制访问控制（MAC，Mandatory Access Control）</font>**<font style="color:rgb(0, 0, 0);background-color:rgb(252, 252, 252);"> 的安全机制。它由美国国家安全局（NSA）开发，核心作用是在传统 “自主访问控制（DAC）” 基础上，为系统资源（文件、进程、端口等）增加更精细的安全策略，即使 root 用户也受其规则限制，可有效防御权限滥用、恶意程序提权等安全威胁。</font>

## <font style="color:rgb(0, 0, 0);background-color:rgb(252, 252, 252);">一、SELinux 核心概念</font>
<font style="color:rgb(0, 0, 0);background-color:rgb(252, 252, 252);">理解 SELinux 的关键是掌握 “主体 - 客体 - 策略” 的访问控制模型，以及相关核心术语：</font>

| **<font style="color:rgb(0, 0, 0);background-color:rgb(252, 252, 252);">术语</font>** | **<font style="color:rgb(0, 0, 0);background-color:rgb(252, 252, 252);">定义</font>** |
| :--- | :--- |
| **<font style="color:rgb(0, 0, 0);background-color:rgb(252, 252, 252);">主体（Subject）</font>** | <font style="color:rgb(0, 0, 0);background-color:rgb(252, 252, 252);">发起访问请求的实体，通常是</font><font style="color:rgb(0, 0, 0);background-color:rgb(252, 252, 252);"> </font>**<font style="color:rgb(0, 0, 0);background-color:rgb(252, 252, 252);">进程</font>**<font style="color:rgb(0, 0, 0);background-color:rgb(252, 252, 252);">（如</font><font style="color:rgb(0, 0, 0);background-color:rgb(252, 252, 252);"> </font>`<font style="color:rgb(0, 0, 0);background-color:rgb(252, 252, 252);">httpd</font>`<br/><font style="color:rgb(0, 0, 0);background-color:rgb(252, 252, 252);">、</font>`<font style="color:rgb(0, 0, 0);background-color:rgb(252, 252, 252);">mysql</font>`<br/><font style="color:rgb(0, 0, 0);background-color:rgb(252, 252, 252);"> </font><font style="color:rgb(0, 0, 0);background-color:rgb(252, 252, 252);">进程）。</font> |
| **<font style="color:rgb(0, 0, 0);background-color:rgb(252, 252, 252);">客体（Object）</font>** | <font style="color:rgb(0, 0, 0);background-color:rgb(252, 252, 252);">被访问的资源，通常是</font><font style="color:rgb(0, 0, 0);background-color:rgb(252, 252, 252);"> </font>**<font style="color:rgb(0, 0, 0);background-color:rgb(252, 252, 252);">文件、目录、端口、设备</font>**<font style="color:rgb(0, 0, 0);background-color:rgb(252, 252, 252);"> </font><font style="color:rgb(0, 0, 0);background-color:rgb(252, 252, 252);">等。</font> |
| **<font style="color:rgb(0, 0, 0);background-color:rgb(252, 252, 252);">安全上下文（Security Context）</font>** | <font style="color:rgb(0, 0, 0);background-color:rgb(252, 252, 252);">SELinux 为每个主体和客体分配的 “标签”，是访问控制的核心依据。格式为</font><font style="color:rgb(0, 0, 0);background-color:rgb(252, 252, 252);"> </font>`<font style="color:rgb(0, 0, 0);background-color:rgb(252, 252, 252);">user:role:type:level</font>`<br/><font style="color:rgb(0, 0, 0);background-color:rgb(252, 252, 252);">（通常简化为</font><font style="color:rgb(0, 0, 0);background-color:rgb(252, 252, 252);"> </font>`<font style="color:rgb(0, 0, 0);background-color:rgb(252, 252, 252);">user:role:type</font>`<br/><font style="color:rgb(0, 0, 0);background-color:rgb(252, 252, 252);">）。</font> |
| **<font style="color:rgb(0, 0, 0);background-color:rgb(252, 252, 252);">策略（Policy）</font>** | <font style="color:rgb(0, 0, 0);background-color:rgb(252, 252, 252);">SELinux 预定义的安全规则集合，决定主体能否访问客体（基于二者的安全上下文匹配）。</font> |
| **<font style="color:rgb(0, 0, 0);background-color:rgb(252, 252, 252);">类型强制（Type Enforcement）</font>** | <font style="color:rgb(0, 0, 0);background-color:rgb(252, 252, 252);">SELinux 最核心的访问控制方式，通过 “主体类型（Domain）” 和 “客体类型（Type）” 的匹配规则，控制进程对资源的访问。</font> |


### <font style="color:rgb(0, 0, 0);background-color:rgb(252, 252, 252);">1. 安全上下文（Security Context）详解</font>
<font style="color:rgb(0, 0, 0);background-color:rgb(252, 252, 252);">安全上下文是 SELinux 识别主体和客体的 “身份证”，所有访问控制均基于此标签匹配。通过</font><font style="color:rgb(0, 0, 0);background-color:rgb(252, 252, 252);"> </font>`<font style="color:rgb(0, 0, 0);background-color:rgb(252, 252, 252);">ls -Z</font>`<font style="color:rgb(0, 0, 0);background-color:rgb(252, 252, 252);">（查看文件）或</font><font style="color:rgb(0, 0, 0);background-color:rgb(252, 252, 252);"> </font>`<font style="color:rgb(0, 0, 0);background-color:rgb(252, 252, 252);">ps -Z</font>`<font style="color:rgb(0, 0, 0);background-color:rgb(252, 252, 252);">（查看进程）可查看上下文：</font>

#### <font style="color:rgb(0, 0, 0);background-color:rgb(252, 252, 252);">示例 1：查看文件的安全上下文</font>
**<font style="color:rgba(0, 0, 0, 0.85);background-color:rgb(252, 252, 252);">bash</font>**

```bash
ls -Z /var/www/html/index.html
# 输出示例：unconfined_u:object_r:httpd_sys_content_t:s0 /var/www/html/index.html
```

+ `<font style="color:rgb(0, 0, 0);background-color:rgb(252, 252, 252);">unconfined_u</font>`<font style="color:rgb(0, 0, 0);background-color:rgb(252, 252, 252);">：用户（User），表示文件所属的 SELinux 用户；</font>
+ `<font style="color:rgb(0, 0, 0);background-color:rgb(252, 252, 252);">object_r</font>`<font style="color:rgb(0, 0, 0);background-color:rgb(252, 252, 252);">：角色（Role），客体（文件 / 目录）的角色固定为</font><font style="color:rgb(0, 0, 0);background-color:rgb(252, 252, 252);"> </font>`<font style="color:rgb(0, 0, 0);background-color:rgb(252, 252, 252);">object_r</font>`<font style="color:rgb(0, 0, 0);background-color:rgb(252, 252, 252);">；</font>
+ `<font style="color:rgb(0, 0, 0);background-color:rgb(252, 252, 252);">httpd_sys_content_t</font>`<font style="color:rgb(0, 0, 0);background-color:rgb(252, 252, 252);">：类型（Type），客体类型，此类型表示 “供 httpd 进程访问的网页内容文件”；</font>
+ `<font style="color:rgb(0, 0, 0);background-color:rgb(252, 252, 252);">s0</font>`<font style="color:rgb(0, 0, 0);background-color:rgb(252, 252, 252);">：级别（Level），MLS/MCS 安全级别，默认场景下可忽略。</font>

#### <font style="color:rgb(0, 0, 0);background-color:rgb(252, 252, 252);">示例 2：查看进程的安全上下文</font>
**<font style="color:rgba(0, 0, 0, 0.85);background-color:rgb(252, 252, 252);">bash</font>**

```bash
ps -Z | grep httpd
# 输出示例：system_u:system_r:httpd_t:s0  1234 ?  00:00:00 httpd
```

+ `<font style="color:rgb(0, 0, 0);background-color:rgb(252, 252, 252);">system_u</font>`<font style="color:rgb(0, 0, 0);background-color:rgb(252, 252, 252);">：SELinux 用户；</font>
+ `<font style="color:rgb(0, 0, 0);background-color:rgb(252, 252, 252);">system_r</font>`<font style="color:rgb(0, 0, 0);background-color:rgb(252, 252, 252);">：角色（Role），进程的角色通常为</font><font style="color:rgb(0, 0, 0);background-color:rgb(252, 252, 252);"> </font>`<font style="color:rgb(0, 0, 0);background-color:rgb(252, 252, 252);">system_r</font>`<font style="color:rgb(0, 0, 0);background-color:rgb(252, 252, 252);">；</font>
+ `<font style="color:rgb(0, 0, 0);background-color:rgb(252, 252, 252);">httpd_t</font>`<font style="color:rgb(0, 0, 0);background-color:rgb(252, 252, 252);">：类型（Type），主体类型（进程域），此类型表示 “httpd 进程的域”。</font>

### <font style="color:rgb(0, 0, 0);background-color:rgb(252, 252, 252);">2. SELinux 策略（Policy）类型</font>
<font style="color:rgb(0, 0, 0);background-color:rgb(252, 252, 252);">SELinux 提供两种预设策略，不同 Linux 发行版默认策略不同：</font>

| **<font style="color:rgb(0, 0, 0);background-color:rgb(252, 252, 252);">策略类型</font>** | **<font style="color:rgb(0, 0, 0);background-color:rgb(252, 252, 252);">特点</font>** | **<font style="color:rgb(0, 0, 0);background-color:rgb(252, 252, 252);">适用场景</font>** |
| :--- | :--- | :--- |
| **<font style="color:rgb(0, 0, 0);background-color:rgb(252, 252, 252);">targeted</font>** | <font style="color:rgb(0, 0, 0);background-color:rgb(252, 252, 252);">仅对 “关键进程”（如 httpd、mysql、sshd）施加严格控制，普通进程不受限制</font> | <font style="color:rgb(0, 0, 0);background-color:rgb(252, 252, 252);">绝大多数场景（CentOS/RHEL 默认）</font> |
| **<font style="color:rgb(0, 0, 0);background-color:rgb(252, 252, 252);">strict</font>** | <font style="color:rgb(0, 0, 0);background-color:rgb(252, 252, 252);">对所有进程和资源施加强制访问控制，安全级别最高</font> | <font style="color:rgb(0, 0, 0);background-color:rgb(252, 252, 252);">极高安全需求场景（如政府、金融）</font> |


## <font style="color:rgb(0, 0, 0);background-color:rgb(252, 252, 252);">二、SELinux 模式与基础操作</font>
<font style="color:rgb(0, 0, 0);background-color:rgb(252, 252, 252);">SELinux 有三种运行模式，可根据需求灵活切换（生产环境建议保持</font><font style="color:rgb(0, 0, 0);background-color:rgb(252, 252, 252);"> </font>`<font style="color:rgb(0, 0, 0);background-color:rgb(252, 252, 252);">enforcing</font>`<font style="color:rgb(0, 0, 0);background-color:rgb(252, 252, 252);"> </font><font style="color:rgb(0, 0, 0);background-color:rgb(252, 252, 252);">模式）：</font>

| **<font style="color:rgb(0, 0, 0);background-color:rgb(252, 252, 252);">模式</font>** | **<font style="color:rgb(0, 0, 0);background-color:rgb(252, 252, 252);">作用</font>** |
| :--- | :--- |
| **<font style="color:rgb(0, 0, 0);background-color:rgb(252, 252, 252);">enforcing</font>** | <font style="color:rgb(0, 0, 0);background-color:rgb(252, 252, 252);">强制模式：严格执行 SELinux 规则，违反规则的访问会被拒绝并记录日志。</font> |
| **<font style="color:rgb(0, 0, 0);background-color:rgb(252, 252, 252);">permissive</font>** | <font style="color:rgb(0, 0, 0);background-color:rgb(252, 252, 252);">宽容模式：不拒绝访问，但会记录违反规则的行为（用于调试规则）。</font> |
| **<font style="color:rgb(0, 0, 0);background-color:rgb(252, 252, 252);">disabled</font>** | <font style="color:rgb(0, 0, 0);background-color:rgb(252, 252, 252);">禁用模式：完全关闭 SELinux（不推荐，会失去安全防护）。</font> |


### <font style="color:rgb(0, 0, 0);background-color:rgb(252, 252, 252);">1. 查看 SELinux 状态与模式</font>
**<font style="color:rgba(0, 0, 0, 0.85);background-color:rgb(252, 252, 252);">bash</font>**

```bash
# 1. 查看 SELinux 整体状态（enabled/disabled）
sestatus | grep "SELinux status"

# 2. 查看当前运行模式（enforcing/permissive/disabled）
getenforce

# 3. 查看详细状态（包含策略类型、模式等）
sestatus
```

### <font style="color:rgb(0, 0, 0);background-color:rgb(252, 252, 252);">2. 临时切换 SELinux 模式（重启后失效）</font>
<font style="color:rgb(0, 0, 0);background-color:rgb(252, 252, 252);">临时切换无需修改配置文件，适合测试场景：</font>

**<font style="color:rgba(0, 0, 0, 0.85);background-color:rgb(252, 252, 252);">bash</font>**

```bash
# 1. 切换到宽容模式（permissive）
setenforce 0

# 2. 切换到强制模式（enforcing）
setenforce 1

# 注：若 SELinux 处于 disabled 模式，setenforce 命令无效
```

### <font style="color:rgb(0, 0, 0);background-color:rgb(252, 252, 252);">3. 永久修改 SELinux 模式（重启后生效）</font>
<font style="color:rgb(0, 0, 0);background-color:rgb(252, 252, 252);">需修改</font><font style="color:rgb(0, 0, 0);background-color:rgb(252, 252, 252);"> </font>`<font style="color:rgb(0, 0, 0);background-color:rgb(252, 252, 252);">/etc/selinux/config</font>`<font style="color:rgb(0, 0, 0);background-color:rgb(252, 252, 252);"> </font><font style="color:rgb(0, 0, 0);background-color:rgb(252, 252, 252);">配置文件，生产环境修改前需谨慎：</font>

**<font style="color:rgba(0, 0, 0, 0.85);background-color:rgb(252, 252, 252);">bash</font>**

```bash
# 编辑配置文件
vim /etc/selinux/config

# 修改 SELINUX 字段：
# - 强制模式：SELINUX=enforcing
# - 宽容模式：SELINUX=permissive
# - 禁用模式：SELINUX=disabled

# 保存后，重启服务器生效
reboot
```

<font style="color:rgb(0, 0, 0);background-color:rgb(252, 252, 252);">⚠️</font><font style="color:rgb(0, 0, 0);background-color:rgb(252, 252, 252);"> 注意：从</font><font style="color:rgb(0, 0, 0);background-color:rgb(252, 252, 252);"> </font>`<font style="color:rgba(0, 0, 0, 0.5) !important;background-color:rgb(252, 252, 252);">disabled</font>`<font style="color:rgb(0, 0, 0);background-color:rgb(252, 252, 252);"> </font><font style="color:rgb(0, 0, 0);background-color:rgb(252, 252, 252);">切换到</font><font style="color:rgb(0, 0, 0);background-color:rgb(252, 252, 252);"> </font>`<font style="color:rgba(0, 0, 0, 0.5) !important;background-color:rgb(252, 252, 252);">enforcing/permissive</font>`<font style="color:rgb(0, 0, 0);background-color:rgb(252, 252, 252);"> </font><font style="color:rgb(0, 0, 0);background-color:rgb(252, 252, 252);">时，系统会自动为所有文件重新添加安全上下文（可能耗时较长，需耐心等待）。</font>

## <font style="color:rgb(0, 0, 0);background-color:rgb(252, 252, 252);">三、SELinux 核心操作（类型与规则管理）</font>
<font style="color:rgb(0, 0, 0);background-color:rgb(252, 252, 252);">SELinux 的日常配置主要围绕 “调整安全上下文” 和 “管理布尔值（Booleans）” 展开，以下是最常用的操作：</font>

### <font style="color:rgb(0, 0, 0);background-color:rgb(252, 252, 252);">1. 管理文件 / 目录的安全上下文</font>
<font style="color:rgb(0, 0, 0);background-color:rgb(252, 252, 252);">当文件的安全上下文不正确时（如手动移动网页文件到</font><font style="color:rgb(0, 0, 0);background-color:rgb(252, 252, 252);"> </font>`<font style="color:rgb(0, 0, 0);background-color:rgb(252, 252, 252);">/var/www/html</font>`<font style="color:rgb(0, 0, 0);background-color:rgb(252, 252, 252);"> </font><font style="color:rgb(0, 0, 0);background-color:rgb(252, 252, 252);">后，类型仍为普通文件类型），会导致进程（如</font><font style="color:rgb(0, 0, 0);background-color:rgb(252, 252, 252);"> </font>`<font style="color:rgb(0, 0, 0);background-color:rgb(252, 252, 252);">httpd</font>`<font style="color:rgb(0, 0, 0);background-color:rgb(252, 252, 252);">）无法访问，需手动调整。</font>

#### <font style="color:rgb(0, 0, 0);background-color:rgb(252, 252, 252);">常用命令：</font>`<font style="color:rgb(0, 0, 0);background-color:rgb(252, 252, 252);">chcon</font>`<font style="color:rgb(0, 0, 0);background-color:rgb(252, 252, 252);"> </font><font style="color:rgb(0, 0, 0);background-color:rgb(252, 252, 252);">与</font><font style="color:rgb(0, 0, 0);background-color:rgb(252, 252, 252);"> </font>`<font style="color:rgb(0, 0, 0);background-color:rgb(252, 252, 252);">restorecon</font>`
+ `<font style="color:rgb(0, 0, 0);background-color:rgb(252, 252, 252);">chcon</font>`<font style="color:rgb(0, 0, 0);background-color:rgb(252, 252, 252);">：手动修改文件的安全上下文（临时生效，系统重启或执行</font><font style="color:rgb(0, 0, 0);background-color:rgb(252, 252, 252);"> </font>`<font style="color:rgb(0, 0, 0);background-color:rgb(252, 252, 252);">restorecon</font>`<font style="color:rgb(0, 0, 0);background-color:rgb(252, 252, 252);"> </font><font style="color:rgb(0, 0, 0);background-color:rgb(252, 252, 252);">后可能恢复）；</font>
+ `<font style="color:rgb(0, 0, 0);background-color:rgb(252, 252, 252);">restorecon</font>`<font style="color:rgb(0, 0, 0);background-color:rgb(252, 252, 252);">：根据预设的 “上下文规则” 恢复文件的安全上下文（永久生效，推荐使用）。</font>

#### <font style="color:rgb(0, 0, 0);background-color:rgb(252, 252, 252);">示例 1：修复网页文件的安全上下文</font>
**<font style="color:rgba(0, 0, 0, 0.85);background-color:rgb(252, 252, 252);">bash</font>**

```bash
# 场景：/var/www/html/test.html 的类型为普通文件类型（user_home_t），httpd 无法访问
ls -Z /var/www/html/test.html  # 查看当前上下文，假设类型为 user_home_t

# 方法1：用 chcon 手动修改类型为 httpd_sys_content_t（临时）
chcon -t httpd_sys_content_t /var/www/html/test.html

# 方法2：用 restorecon 恢复默认上下文（永久，推荐）
restorecon -v /var/www/html/test.html  # -v：显示详细过程
```

#### <font style="color:rgb(0, 0, 0);background-color:rgb(252, 252, 252);">示例 2：批量修改目录下所有文件的上下文</font>
**<font style="color:rgba(0, 0, 0, 0.85);background-color:rgb(252, 252, 252);">bash</font>**

```bash
# 批量恢复 /var/www/html 目录下所有文件的上下文
restorecon -Rv /var/www/html  # -R：递归处理子目录
```

### <font style="color:rgb(0, 0, 0);background-color:rgb(252, 252, 252);">2. 管理 SELinux 布尔值（Booleans）</font>
<font style="color:rgb(0, 0, 0);background-color:rgb(252, 252, 252);">布尔值（Booleans）是 SELinux 中用于 “快速开关特定安全规则” 的配置项，通常对应特定场景的访问权限（如允许</font><font style="color:rgb(0, 0, 0);background-color:rgb(252, 252, 252);"> </font>`<font style="color:rgb(0, 0, 0);background-color:rgb(252, 252, 252);">httpd</font>`<font style="color:rgb(0, 0, 0);background-color:rgb(252, 252, 252);"> </font><font style="color:rgb(0, 0, 0);background-color:rgb(252, 252, 252);">访问数据库、允许</font><font style="color:rgb(0, 0, 0);background-color:rgb(252, 252, 252);"> </font>`<font style="color:rgb(0, 0, 0);background-color:rgb(252, 252, 252);">ftp</font>`<font style="color:rgb(0, 0, 0);background-color:rgb(252, 252, 252);"> </font><font style="color:rgb(0, 0, 0);background-color:rgb(252, 252, 252);">服务访问用户目录等）。</font>

#### <font style="color:rgb(0, 0, 0);background-color:rgb(252, 252, 252);">常用命令：</font>`<font style="color:rgb(0, 0, 0);background-color:rgb(252, 252, 252);">getsebool</font>`<font style="color:rgb(0, 0, 0);background-color:rgb(252, 252, 252);"> </font><font style="color:rgb(0, 0, 0);background-color:rgb(252, 252, 252);">与</font><font style="color:rgb(0, 0, 0);background-color:rgb(252, 252, 252);"> </font>`<font style="color:rgb(0, 0, 0);background-color:rgb(252, 252, 252);">setsebool</font>`
+ `<font style="color:rgb(0, 0, 0);background-color:rgb(252, 252, 252);">getsebool</font>`<font style="color:rgb(0, 0, 0);background-color:rgb(252, 252, 252);">：查看布尔值的当前状态（on/off）；</font>
+ `<font style="color:rgb(0, 0, 0);background-color:rgb(252, 252, 252);">setsebool</font>`<font style="color:rgb(0, 0, 0);background-color:rgb(252, 252, 252);">：修改布尔值的状态（临时 / 永久）。</font>

#### <font style="color:rgb(0, 0, 0);background-color:rgb(252, 252, 252);">示例 1：允许 httpd 访问 MySQL 数据库</font>
**<font style="color:rgba(0, 0, 0, 0.85);background-color:rgb(252, 252, 252);">bash</font>**

```bash
# 1. 查看与 httpd 访问数据库相关的布尔值
getsebool -a | grep httpd_can_network_connect_db  # -a：查看所有布尔值

# 2. 临时开启布尔值（重启后失效）
setsebool httpd_can_network_connect_db on

# 3. 永久开启布尔值（重启后生效，推荐）
setsebool -P httpd_can_network_connect_db on  # -P：永久生效
```

#### <font style="color:rgb(0, 0, 0);background-color:rgb(252, 252, 252);">示例 2：允许 ftp 服务访问用户目录</font>
**<font style="color:rgba(0, 0, 0, 0.85);background-color:rgb(252, 252, 252);">bash</font>**

```bash
# 查看 ftp 访问用户目录的布尔值
getsebool -a | grep ftp_home_dir

# 永久开启
setsebool -P ftp_home_dir on
```

### <font style="color:rgb(0, 0, 0);background-color:rgb(252, 252, 252);">3. 管理 SELinux 端口标签</font>
<font style="color:rgb(0, 0, 0);background-color:rgb(252, 252, 252);">SELinux 不仅控制文件访问，还控制进程监听的端口。若进程监听的端口未添加 SELinux 标签（Port Type），会被 SELinux 阻断（进程可启动，但无法监听端口）。</font>

#### <font style="color:rgb(0, 0, 0);background-color:rgb(252, 252, 252);">常用命令：</font>`<font style="color:rgb(0, 0, 0);background-color:rgb(252, 252, 252);">semanage port</font>`
`<font style="color:rgb(0, 0, 0);background-color:rgb(252, 252, 252);">seemanage</font>`<font style="color:rgb(0, 0, 0);background-color:rgb(252, 252, 252);"> </font><font style="color:rgb(0, 0, 0);background-color:rgb(252, 252, 252);">用于管理 SELinux 的 “端口映射规则”，需安装</font><font style="color:rgb(0, 0, 0);background-color:rgb(252, 252, 252);"> </font>`<font style="color:rgb(0, 0, 0);background-color:rgb(252, 252, 252);">policycoreutils-python</font>`<font style="color:rgb(0, 0, 0);background-color:rgb(252, 252, 252);"> </font><font style="color:rgb(0, 0, 0);background-color:rgb(252, 252, 252);">包（CentOS/RHEL）：</font>

**<font style="color:rgba(0, 0, 0, 0.85);background-color:rgb(252, 252, 252);">bash</font>**

```bash
# 安装依赖包（若未安装）
yum install -y policycoreutils-python
```

#### <font style="color:rgb(0, 0, 0);background-color:rgb(252, 252, 252);">示例：允许 httpd 监听 8080 端口</font>
**<font style="color:rgba(0, 0, 0, 0.85);background-color:rgb(252, 252, 252);">bash</font>**

```bash
# 场景：httpd 需监听 8080 端口（默认仅允许 80 端口），启动后报错“无法绑定端口”

# 1. 查看 httpd 允许监听的端口标签（http_port_t）对应的端口
semanage port -l | grep http_port_t  # 输出默认允许的端口：80, 443, 488, 8008, 8009, 8443

# 2. 永久添加 8080 端口到 http_port_t 标签
semanage port -a -t http_port_t -p tcp 8080  # -a：添加；-t：指定标签；-p：指定协议

# 3. 验证是否添加成功
semanage port -l | grep http_port_t  # 此时会显示 8080 端口

# 4. 重启 httpd 服务
systemctl restart httpd
```

## <font style="color:rgb(0, 0, 0);background-color:rgb(252, 252, 252);">四、SELinux 日志分析（排查访问被拒问题）</font>
<font style="color:rgb(0, 0, 0);background-color:rgb(252, 252, 252);">当 SELinux 拒绝进程访问资源时，会将事件记录到系统日志中（默认路径：</font>`<font style="color:rgb(0, 0, 0);background-color:rgb(252, 252, 252);">/var/log/audit/audit.log</font>`<font style="color:rgb(0, 0, 0);background-color:rgb(252, 252, 252);">）。通过分析日志，可定位被拒原因（如上下文不匹配、布尔值未开启等）。</font>

### <font style="color:rgb(0, 0, 0);background-color:rgb(252, 252, 252);">1. 查看 SELinux 拒绝日志</font>
<font style="color:rgb(0, 0, 0);background-color:rgb(252, 252, 252);">直接查看</font><font style="color:rgb(0, 0, 0);background-color:rgb(252, 252, 252);"> </font>`<font style="color:rgb(0, 0, 0);background-color:rgb(252, 252, 252);">audit.log</font>`<font style="color:rgb(0, 0, 0);background-color:rgb(252, 252, 252);"> </font><font style="color:rgb(0, 0, 0);background-color:rgb(252, 252, 252);">会包含大量无关日志，推荐使用</font><font style="color:rgb(0, 0, 0);background-color:rgb(252, 252, 252);"> </font>`<font style="color:rgb(0, 0, 0);background-color:rgb(252, 252, 252);">ausearch</font>`<font style="color:rgb(0, 0, 0);background-color:rgb(252, 252, 252);"> </font><font style="color:rgb(0, 0, 0);background-color:rgb(252, 252, 252);">工具过滤 SELinux 相关日志（需安装</font><font style="color:rgb(0, 0, 0);background-color:rgb(252, 252, 252);"> </font>`<font style="color:rgb(0, 0, 0);background-color:rgb(252, 252, 252);">audit</font>`<font style="color:rgb(0, 0, 0);background-color:rgb(252, 252, 252);"> </font><font style="color:rgb(0, 0, 0);background-color:rgb(252, 252, 252);">包）：</font>

**<font style="color:rgba(0, 0, 0, 0.85);background-color:rgb(252, 252, 252);">bash</font>**

```bash
# 1. 安装 audit 包（若未安装）
yum install -y audit

# 2. 查看最近的 SELinux 拒绝事件（deny）
ausearch -m avc -ts recent  # -m avc：筛选 AVC（Access Vector Cache）事件；-ts recent：最近事件
```

### <font style="color:rgb(0, 0, 0);background-color:rgb(252, 252, 252);">2. 日志关键信息解读</font>
<font style="color:rgb(0, 0, 0);background-color:rgb(252, 252, 252);">SELinux 拒绝日志的核心信息包括：</font>

+ `<font style="color:rgb(0, 0, 0);background-color:rgb(252, 252, 252);">comm="httpd"</font>`<font style="color:rgb(0, 0, 0);background-color:rgb(252, 252, 252);">：被拒的主体（进程）；</font>
+ `<font style="color:rgb(0, 0, 0);background-color:rgb(252, 252, 252);">path="/var/www/html/test.html"</font>`<font style="color:rgb(0, 0, 0);background-color:rgb(252, 252, 252);">：被拒访问的客体（文件）；</font>
+ `<font style="color:rgb(0, 0, 0);background-color:rgb(252, 252, 252);">scontext=system_u:system_r:httpd_t:s0</font>`<font style="color:rgb(0, 0, 0);background-color:rgb(252, 252, 252);">：主体的安全上下文；</font>
+ `<font style="color:rgb(0, 0, 0);background-color:rgb(252, 252, 252);">tcontext=unconfined_u:object_r:user_home_t:s0</font>`<font style="color:rgb(0, 0, 0);background-color:rgb(252, 252, 252);">：客体的安全上下文；</font>
+ `<font style="color:rgb(0, 0, 0);background-color:rgb(252, 252, 252);">reason="type mismatch"</font>`<font style="color:rgb(0, 0, 0);background-color:rgb(252, 252, 252);">：拒绝原因（类型不匹配）。</font>

#### <font style="color:rgb(0, 0, 0);background-color:rgb(252, 252, 252);">示例日志片段：</font>
**<font style="color:rgba(0, 0, 0, 0.85);background-color:rgb(252, 252, 252);">plaintext</font>**

```plain
type=AVC msg=audit(1690000000.123:123): avc:  denied  { read } for  pid=1234 comm="httpd" name="test.html" dev="sda1" ino=12345 scontext=system_u:system_r:httpd_t:s0 tcontext=unconfined_u:object_r:user_home_t:s0 tclass=file permissive=0
```

+ <font style="color:rgb(0, 0, 0);background-color:rgb(252, 252, 252);">解读：</font>`<font style="color:rgb(0, 0, 0);background-color:rgb(252, 252, 252);">httpd</font>`<font style="color:rgb(0, 0, 0);background-color:rgb(252, 252, 252);"> </font><font style="color:rgb(0, 0, 0);background-color:rgb(252, 252, 252);">进程（scontext 类型为</font><font style="color:rgb(0, 0, 0);background-color:rgb(252, 252, 252);"> </font>`<font style="color:rgb(0, 0, 0);background-color:rgb(252, 252, 252);">httpd_t</font>`<font style="color:rgb(0, 0, 0);background-color:rgb(252, 252, 252);">）尝试读取</font><font style="color:rgb(0, 0, 0);background-color:rgb(252, 252, 252);"> </font>`<font style="color:rgb(0, 0, 0);background-color:rgb(252, 252, 252);">test.html</font>`<font style="color:rgb(0, 0, 0);background-color:rgb(252, 252, 252);"> </font><font style="color:rgb(0, 0, 0);background-color:rgb(252, 252, 252);">文件（tcontext 类型为</font><font style="color:rgb(0, 0, 0);background-color:rgb(252, 252, 252);"> </font>`<font style="color:rgb(0, 0, 0);background-color:rgb(252, 252, 252);">user_home_t</font>`<font style="color:rgb(0, 0, 0);background-color:rgb(252, 252, 252);">），因类型不匹配被拒绝；</font>
+ <font style="color:rgb(0, 0, 0);background-color:rgb(252, 252, 252);">解决方案：用</font><font style="color:rgb(0, 0, 0);background-color:rgb(252, 252, 252);"> </font>`<font style="color:rgb(0, 0, 0);background-color:rgb(252, 252, 252);">restorecon</font>`<font style="color:rgb(0, 0, 0);background-color:rgb(252, 252, 252);"> </font><font style="color:rgb(0, 0, 0);background-color:rgb(252, 252, 252);">将文件类型改为</font><font style="color:rgb(0, 0, 0);background-color:rgb(252, 252, 252);"> </font>`<font style="color:rgb(0, 0, 0);background-color:rgb(252, 252, 252);">httpd_sys_content_t</font>`<font style="color:rgb(0, 0, 0);background-color:rgb(252, 252, 252);">。</font>

## <font style="color:rgb(0, 0, 0);background-color:rgb(252, 252, 252);">五、SELinux 配置注意事项</font>
1. **<font style="color:rgb(0, 0, 0);background-color:rgb(252, 252, 252);">生产环境不建议禁用</font>**<font style="color:rgb(0, 0, 0);background-color:rgb(252, 252, 252);">：SELinux 是 Linux 系统的重要安全屏障，禁用后会失去对 root 权限滥用、恶意程序提权的防护，除非有特殊兼容性需求（如部分老旧软件不支持 SELinux），否则需保持</font><font style="color:rgb(0, 0, 0);background-color:rgb(252, 252, 252);"> </font>`<font style="color:rgb(0, 0, 0);background-color:rgb(252, 252, 252);">enforcing</font>`<font style="color:rgb(0, 0, 0);background-color:rgb(252, 252, 252);"> </font><font style="color:rgb(0, 0, 0);background-color:rgb(252, 252, 252);">模式。</font>
2. **<font style="color:rgb(0, 0, 0);background-color:rgb(252, 252, 252);">优先使用标准工具调整配置</font>**<font style="color:rgb(0, 0, 0);background-color:rgb(252, 252, 252);">：</font>
    - <font style="color:rgb(0, 0, 0);background-color:rgb(252, 252, 252);">修改文件上下文优先用</font><font style="color:rgb(0, 0, 0);background-color:rgb(252, 252, 252);"> </font>`<font style="color:rgb(0, 0, 0);background-color:rgb(252, 252, 252);">restorecon</font>`<font style="color:rgb(0, 0, 0);background-color:rgb(252, 252, 252);">（而非</font><font style="color:rgb(0, 0, 0);background-color:rgb(252, 252, 252);"> </font>`<font style="color:rgb(0, 0, 0);background-color:rgb(252, 252, 252);">chcon</font>`<font style="color:rgb(0, 0, 0);background-color:rgb(252, 252, 252);">），确保永久生效；</font>
    - <font style="color:rgb(0, 0, 0);background-color:rgb(252, 252, 252);">调整访问规则优先用</font><font style="color:rgb(0, 0, 0);background-color:rgb(252, 252, 252);"> </font>`<font style="color:rgb(0, 0, 0);background-color:rgb(252, 252, 252);">setsebool</font>`<font style="color:rgb(0, 0, 0);background-color:rgb(252, 252, 252);">（而非直接修改策略文件），避免破坏预设策略。</font>
3. **<font style="color:rgb(0, 0, 0);background-color:rgb(252, 252, 252);">远程管理需预留救援通道</font>**<font style="color:rgb(0, 0, 0);background-color:rgb(252, 252, 252);">：若因 SELinux 配置失误导致远程登录（SSH）被拒，需通过服务器控制台（如云服务商的 VNC 控制台）修复，避免无法操作。</font>
4. **<font style="color:rgb(0, 0, 0);background-color:rgb(252, 252, 252);">结合日志快速排查问题</font>**<font style="color:rgb(0, 0, 0);background-color:rgb(252, 252, 252);">：遇到 “进程启动正常但服务无法访问”“端口监听失败” 等问题时，优先查看 SELinux 日志（</font>`<font style="color:rgb(0, 0, 0);background-color:rgb(252, 252, 252);">ausearch -m avc -ts recent</font>`<font style="color:rgb(0, 0, 0);background-color:rgb(252, 252, 252);">），定位是否为 SELinux 规则阻断。</font>

<font style="color:rgb(0, 0, 0);background-color:rgb(252, 252, 252);">通过合理配置 SELinux，可在不影响业务的前提下，为 Linux 系统增加一层强大的安全防护，尤其适合服务器、数据库等关键基础设施的安全加固。</font>


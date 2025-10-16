`<font style="color:rgb(0, 0, 0);background-color:rgba(0, 0, 0, 0);">firewalld</font>`<font style="color:rgb(0, 0, 0);background-color:rgba(0, 0, 0, 0);">（Firewall Dynamic）是 </font>**<font style="color:rgb(0, 0, 0);background-color:rgba(0, 0, 0, 0);">CentOS 7+、RHEL 7+</font>**<font style="color:rgb(0, 0, 0);background-color:rgba(0, 0, 0, 0);"> 等系统默认的动态防火墙管理工具，替代了传统的 </font>`<font style="color:rgb(0, 0, 0);background-color:rgba(0, 0, 0, 0);">iptables</font>`<font style="color:rgb(0, 0, 0);background-color:rgba(0, 0, 0, 0);"> 静态配置方式。它支持 “区域（Zone）” 概念，可动态调整规则（无需重启服务），更适合现代网络环境中灵活的安全策略管理。</font>

## <font style="color:rgb(0, 0, 0);background-color:rgba(0, 0, 0, 0);">一、firewalld 核心概念</font>
<font style="color:rgb(0, 0, 0);background-color:rgba(0, 0, 0, 0);">理解</font><font style="color:rgb(0, 0, 0);background-color:rgba(0, 0, 0, 0);"> </font>`<font style="color:rgb(0, 0, 0);background-color:rgba(0, 0, 0, 0);">firewalld</font>`<font style="color:rgb(0, 0, 0);background-color:rgba(0, 0, 0, 0);"> </font><font style="color:rgb(0, 0, 0);background-color:rgba(0, 0, 0, 0);">的关键是掌握 “区域” 和 “规则” 的逻辑，其核心设计围绕 “不同信任级别划分网络环境” 展开：</font>

### <font style="color:rgb(0, 0, 0);background-color:rgba(0, 0, 0, 0);">1. 区域（Zone）</font>
<font style="color:rgb(0, 0, 0);background-color:rgba(0, 0, 0, 0);">区域是</font><font style="color:rgb(0, 0, 0);background-color:rgba(0, 0, 0, 0);"> </font>`<font style="color:rgb(0, 0, 0);background-color:rgba(0, 0, 0, 0);">firewalld</font>`<font style="color:rgb(0, 0, 0);background-color:rgba(0, 0, 0, 0);"> </font><font style="color:rgb(0, 0, 0);background-color:rgba(0, 0, 0, 0);">的核心，每个区域对应一套预设的安全规则，用于定义对不同网络环境的信任程度。可根据网卡连接的网络（如内网、外网、DMZ）为其分配不同区域，实现差异化防护。</font>

| **<font style="color:rgb(0, 0, 0);background-color:rgba(0, 0, 0, 0);">区域名称</font>** | **<font style="color:rgb(0, 0, 0);background-color:rgba(0, 0, 0, 0);">信任级别</font>** | **<font style="color:rgb(0, 0, 0);background-color:rgba(0, 0, 0, 0);">核心规则（默认）</font>** | **<font style="color:rgb(0, 0, 0);background-color:rgba(0, 0, 0, 0);">适用场景</font>** |
| :--- | :--- | :--- | :--- |
| `<font style="color:rgb(0, 0, 0);background-color:rgba(0, 0, 0, 0);">trusted</font>` | <font style="color:rgb(0, 0, 0);background-color:rgba(0, 0, 0, 0);">最高</font> | <font style="color:rgb(0, 0, 0);background-color:rgba(0, 0, 0, 0);">允许所有入站、出站流量</font> | <font style="color:rgb(0, 0, 0);background-color:rgba(0, 0, 0, 0);">完全信任的网络（如内网服务器集群）</font> |
| `<font style="color:rgb(0, 0, 0);background-color:rgba(0, 0, 0, 0);">home</font>` | <font style="color:rgb(0, 0, 0);background-color:rgba(0, 0, 0, 0);">较高</font> | <font style="color:rgb(0, 0, 0);background-color:rgba(0, 0, 0, 0);">允许常见家庭网络服务（如 SSH、HTTP、DHCP），拒绝其他非必要流量</font> | <font style="color:rgb(0, 0, 0);background-color:rgba(0, 0, 0, 0);">家庭网络</font> |
| `<font style="color:rgb(0, 0, 0);background-color:rgba(0, 0, 0, 0);">work</font>` | <font style="color:rgb(0, 0, 0);background-color:rgba(0, 0, 0, 0);">中等</font> | <font style="color:rgb(0, 0, 0);background-color:rgba(0, 0, 0, 0);">允许办公网络服务（如 SSH、HTTP、HTTPS），禁用家庭娱乐类端口（如游戏、P2P）</font> | <font style="color:rgb(0, 0, 0);background-color:rgba(0, 0, 0, 0);">公司办公网络</font> |
| `<font style="color:rgb(0, 0, 0);background-color:rgba(0, 0, 0, 0);">public</font>` | <font style="color:rgb(0, 0, 0);background-color:rgba(0, 0, 0, 0);">较低</font> | <font style="color:rgb(0, 0, 0);background-color:rgba(0, 0, 0, 0);">仅允许最基础的必要服务（如 SSH、DHCPv6），拒绝大部分入站流量</font> | <font style="color:rgb(0, 0, 0);background-color:rgba(0, 0, 0, 0);">公共网络（如咖啡馆、酒店 WiFi）</font> |
| `<font style="color:rgb(0, 0, 0);background-color:rgba(0, 0, 0, 0);">external</font>` | <font style="color:rgb(0, 0, 0);background-color:rgba(0, 0, 0, 0);">低</font> | <font style="color:rgb(0, 0, 0);background-color:rgba(0, 0, 0, 0);">允许 SSH（供远程管理），其他入站流量默认拒绝；出站流量伪装（NAT），适合作为网关</font> | <font style="color:rgb(0, 0, 0);background-color:rgba(0, 0, 0, 0);">服务器作为外网网关的场景</font> |
| `<font style="color:rgb(0, 0, 0);background-color:rgba(0, 0, 0, 0);">dmz</font>` | <font style="color:rgb(0, 0, 0);background-color:rgba(0, 0, 0, 0);">极低</font> | <font style="color:rgb(0, 0, 0);background-color:rgba(0, 0, 0, 0);">仅允许访问 DMZ 区域内服务器的特定服务（如 HTTP、HTTPS），隔离内网与外网</font> | <font style="color:rgb(0, 0, 0);background-color:rgba(0, 0, 0, 0);">DMZ 区（如 Web 服务器）</font> |
| `<font style="color:rgb(0, 0, 0);background-color:rgba(0, 0, 0, 0);">block</font>` | <font style="color:rgb(0, 0, 0);background-color:rgba(0, 0, 0, 0);">最低</font> | <font style="color:rgb(0, 0, 0);background-color:rgba(0, 0, 0, 0);">拒绝所有入站流量（仅允许出站），主动发送拒绝响应</font> | <font style="color:rgb(0, 0, 0);background-color:rgba(0, 0, 0, 0);">不信任的网络</font> |
| `<font style="color:rgb(0, 0, 0);background-color:rgba(0, 0, 0, 0);">drop</font>` | <font style="color:rgb(0, 0, 0);background-color:rgba(0, 0, 0, 0);">最低</font> | <font style="color:rgb(0, 0, 0);background-color:rgba(0, 0, 0, 0);">丢弃所有入站流量（不响应），仅允许出站</font> | <font style="color:rgb(0, 0, 0);background-color:rgba(0, 0, 0, 0);">极高安全需求，避免被探测</font> |


### <font style="color:rgb(0, 0, 0);background-color:rgba(0, 0, 0, 0);">2. 其他核心概念</font>
+ **<font style="color:rgb(0, 0, 0);background-color:rgba(0, 0, 0, 0);">服务（Service）</font>**<font style="color:rgb(0, 0, 0);background-color:rgba(0, 0, 0, 0);">：</font>`<font style="color:rgb(0, 0, 0);background-color:rgba(0, 0, 0, 0);">firewalld</font>`<font style="color:rgb(0, 0, 0);background-color:rgba(0, 0, 0, 0);"> </font><font style="color:rgb(0, 0, 0);background-color:rgba(0, 0, 0, 0);">预定义的常见服务（如</font><font style="color:rgb(0, 0, 0);background-color:rgba(0, 0, 0, 0);"> </font>`<font style="color:rgb(0, 0, 0);background-color:rgba(0, 0, 0, 0);">ssh</font>`<font style="color:rgb(0, 0, 0);background-color:rgba(0, 0, 0, 0);"> </font><font style="color:rgb(0, 0, 0);background-color:rgba(0, 0, 0, 0);">对应 22 端口、</font>`<font style="color:rgb(0, 0, 0);background-color:rgba(0, 0, 0, 0);">http</font>`<font style="color:rgb(0, 0, 0);background-color:rgba(0, 0, 0, 0);"> </font><font style="color:rgb(0, 0, 0);background-color:rgba(0, 0, 0, 0);">对应 80 端口），可直接通过服务名配置规则，无需手动指定端口。</font>
+ **<font style="color:rgb(0, 0, 0);background-color:rgba(0, 0, 0, 0);">端口（Port）</font>**<font style="color:rgb(0, 0, 0);background-color:rgba(0, 0, 0, 0);">：直接通过 “端口 + 协议”（如</font><font style="color:rgb(0, 0, 0);background-color:rgba(0, 0, 0, 0);"> </font>`<font style="color:rgb(0, 0, 0);background-color:rgba(0, 0, 0, 0);">8080/tcp</font>`<font style="color:rgb(0, 0, 0);background-color:rgba(0, 0, 0, 0);">）配置规则，适用于自定义服务。</font>
+ **<font style="color:rgb(0, 0, 0);background-color:rgba(0, 0, 0, 0);">富规则（Rich Rule）</font>**<font style="color:rgb(0, 0, 0);background-color:rgba(0, 0, 0, 0);">：支持更复杂的条件匹配（如指定源 IP、目的 IP、端口范围、日志记录、速率限制），满足精细化安全需求。</font>
+ **<font style="color:rgb(0, 0, 0);background-color:rgba(0, 0, 0, 0);">伪装（Masquerading）</font>**<font style="color:rgb(0, 0, 0);background-color:rgba(0, 0, 0, 0);">：即 NAT 功能，允许内网主机通过防火墙的公网 IP 访问互联网。</font>

## <font style="color:rgb(0, 0, 0);background-color:rgba(0, 0, 0, 0);">二、firewalld 基础操作（命令行）</font>
`<font style="color:rgb(0, 0, 0);background-color:rgba(0, 0, 0, 0);">firewalld</font>`<font style="color:rgb(0, 0, 0);background-color:rgba(0, 0, 0, 0);"> </font><font style="color:rgb(0, 0, 0);background-color:rgba(0, 0, 0, 0);">的命令行工具为</font><font style="color:rgb(0, 0, 0);background-color:rgba(0, 0, 0, 0);"> </font>`<font style="color:rgb(0, 0, 0);background-color:rgba(0, 0, 0, 0);">firewall-cmd</font>`<font style="color:rgb(0, 0, 0);background-color:rgba(0, 0, 0, 0);">，所有操作需</font><font style="color:rgb(0, 0, 0);background-color:rgba(0, 0, 0, 0);"> </font>**<font style="color:rgb(0, 0, 0);background-color:rgba(0, 0, 0, 0);">root 权限</font>**<font style="color:rgb(0, 0, 0);background-color:rgba(0, 0, 0, 0);">（或加</font><font style="color:rgb(0, 0, 0);background-color:rgba(0, 0, 0, 0);"> </font>`<font style="color:rgb(0, 0, 0);background-color:rgba(0, 0, 0, 0);">sudo</font>`<font style="color:rgb(0, 0, 0);background-color:rgba(0, 0, 0, 0);">）。</font>

### <font style="color:rgb(0, 0, 0);background-color:rgba(0, 0, 0, 0);">1. 服务状态管理</font>
**<font style="color:rgba(0, 0, 0, 0.85);background-color:rgb(252, 252, 252);">bash</font>**

```bash
# 1. 查看firewalld服务状态（running为运行中，dead为未运行）
firewall-cmd --state
# 或通过systemctl查看详细状态
systemctl status firewalld

# 2. 启动firewalld
systemctl start firewalld

# 3. 停止firewalld（生产环境谨慎操作）
systemctl stop firewalld

# 4. 设置firewalld开机自启
systemctl enable firewalld

# 5. 禁止firewalld开机自启
systemctl disable firewalld
```

### <font style="color:rgb(0, 0, 0);background-color:rgba(0, 0, 0, 0);">2. 区域管理</font>
**<font style="color:rgba(0, 0, 0, 0.85);background-color:rgb(252, 252, 252);">bash</font>**

```bash
# 1. 查看当前默认区域
firewall-cmd --get-default-zone

# 2. 查看所有可用区域
firewall-cmd --get-zones

# 3. 查看指定区域的详细规则（如public区域）
firewall-cmd --zone=public --list-all
# 查看所有区域的规则
firewall-cmd --list-all-zones

# 4. 修改默认区域（如改为dmz）
firewall-cmd --set-default-zone=dmz

# 5. 为网卡分配区域（如将eth0网卡分配到external区域）
# 临时生效（重启后失效）
firewall-cmd --zone=external --change-interface=eth0
# 永久生效 --permanent（需重新加载配置）
firewall-cmd --permanent --zone=external --change-interface=eth0
```

## <font style="color:rgb(0, 0, 0);background-color:rgba(0, 0, 0, 0);">三、核心规则配置（服务 / 端口 / 富规则）</font>
`<font style="color:rgb(0, 0, 0);background-color:rgba(0, 0, 0, 0);">firewalld</font>`<font style="color:rgb(0, 0, 0);background-color:rgba(0, 0, 0, 0);"> </font><font style="color:rgb(0, 0, 0);background-color:rgba(0, 0, 0, 0);">的规则配置分为</font><font style="color:rgb(0, 0, 0);background-color:rgba(0, 0, 0, 0);"> </font>**<font style="color:rgb(0, 0, 0);background-color:rgba(0, 0, 0, 0);">临时生效</font>**<font style="color:rgb(0, 0, 0);background-color:rgba(0, 0, 0, 0);">（</font>`<font style="color:rgb(0, 0, 0);background-color:rgba(0, 0, 0, 0);">--permanent</font>`<font style="color:rgb(0, 0, 0);background-color:rgba(0, 0, 0, 0);"> </font><font style="color:rgb(0, 0, 0);background-color:rgba(0, 0, 0, 0);">不添加）和</font><font style="color:rgb(0, 0, 0);background-color:rgba(0, 0, 0, 0);"> </font>**<font style="color:rgb(0, 0, 0);background-color:rgba(0, 0, 0, 0);">永久生效</font>**<font style="color:rgb(0, 0, 0);background-color:rgba(0, 0, 0, 0);">（添加</font><font style="color:rgb(0, 0, 0);background-color:rgba(0, 0, 0, 0);"> </font>`<font style="color:rgb(0, 0, 0);background-color:rgba(0, 0, 0, 0);">--permanent</font>`<font style="color:rgb(0, 0, 0);background-color:rgba(0, 0, 0, 0);">），永久规则需执行</font><font style="color:rgb(0, 0, 0);background-color:rgba(0, 0, 0, 0);"> </font>`<font style="color:rgb(0, 0, 0);background-color:rgba(0, 0, 0, 0);">firewall-cmd --reload</font>`<font style="color:rgb(0, 0, 0);background-color:rgba(0, 0, 0, 0);"> </font><font style="color:rgb(0, 0, 0);background-color:rgba(0, 0, 0, 0);">后生效。</font>

### <font style="color:rgb(0, 0, 0);background-color:rgba(0, 0, 0, 0);">1. 基于 “服务（Service）” 配置规则</font>
<font style="color:rgb(0, 0, 0);background-color:rgba(0, 0, 0, 0);">适合常见预定义服务（如 SSH、HTTP、HTTPS），无需记忆端口号。</font>

**<font style="color:rgba(0, 0, 0, 0.85);background-color:rgb(252, 252, 252);">bash</font>**

```bash
# 1. 查看当前区域允许的服务（如默认区域）
firewall-cmd --list-services

# 2. 查看指定区域允许的服务（如public区域）
firewall-cmd --zone=public --list-services

# 3. 临时允许HTTP服务（默认区域）
firewall-cmd --add-service=http

# 4. 永久允许HTTPS服务（public区域）
firewall-cmd --permanent --zone=public --add-service=https
# 重新加载配置，使永久规则生效
firewall-cmd --reload

# 5. 永久移除public区域的FTP服务
firewall-cmd --permanent --zone=public --remove-service=ftp
firewall-cmd --reload
```

### <font style="color:rgb(0, 0, 0);background-color:rgba(0, 0, 0, 0);">2. 基于 “端口（Port）” 配置规则</font>
<font style="color:rgb(0, 0, 0);background-color:rgba(0, 0, 0, 0);">适合自定义服务（如 Tomcat 的 8080 端口、MySQL 的 3306 端口）。</font>

**<font style="color:rgba(0, 0, 0, 0.85);background-color:rgb(252, 252, 252);">bash</font>**

```bash
# 1. 临时允许8080/tcp端口（默认区域）
firewall-cmd --add-port=8080/tcp

# 2. 永久允许3306/tcp端口（dmz区域，MySQL服务）
firewall-cmd --permanent --zone=dmz --add-port=3306/tcp
firewall-cmd --reload

# 3. 永久允许端口范围（如10000-10010/tcp，默认区域）
firewall-cmd --permanent --add-port=10000-10010/tcp
firewall-cmd --reload

# 4. 永久移除8080/tcp端口（默认区域）
firewall-cmd --permanent --remove-port=8080/tcp
firewall-cmd --reload
```

### <font style="color:rgb(0, 0, 0);background-color:rgba(0, 0, 0, 0);">3. 基于 “富规则（Rich Rule）” 配置复杂规则</font>
<font style="color:rgb(0, 0, 0);background-color:rgba(0, 0, 0, 0);">富规则支持多条件组合（如指定源 IP、日志记录、速率限制），适合精细化控制。</font>

#### <font style="color:rgb(0, 0, 0);background-color:rgba(0, 0, 0, 0);">示例 1：仅允许特定 IP 访问 SSH 服务</font>
**<font style="color:rgba(0, 0, 0, 0.85);background-color:rgb(252, 252, 252);">bash</font>**

```bash
# 永久允许192.168.1.100访问22端口（SSH），拒绝其他IP（默认区域）
firewall-cmd --permanent --add-rich-rule='
rule family="ipv4"
source address="192.168.1.100/32"
port protocol="tcp" port="22" accept
'
# 拒绝其他所有IP访问22端口（需放在允许规则之后）
firewall-cmd --permanent --add-rich-rule='
rule family="ipv4"
port protocol="tcp" port="22" reject
'
firewall-cmd --reload
```

#### <font style="color:rgb(0, 0, 0);background-color:rgba(0, 0, 0, 0);">示例 2：限制单 IP 的连接速率（防御简单 DDoS）</font>
**<font style="color:rgba(0, 0, 0, 0.85);background-color:rgb(252, 252, 252);">bash</font>**

```bash
# 永久限制单个IP每分钟最多10个连接到80端口（HTTP），超过则拒绝（public区域）
firewall-cmd --permanent --zone=public --add-rich-rule='
rule family="ipv4"
port protocol="tcp" port="80"
limit value="10/min" accept
'
firewall-cmd --reload
```

#### <font style="color:rgb(0, 0, 0);background-color:rgba(0, 0, 0, 0);">示例 3：记录特定流量的日志</font>
**<font style="color:rgba(0, 0, 0, 0.85);background-color:rgb(252, 252, 252);">bash</font>**

```bash
# 永久记录所有访问443端口（HTTPS）的流量到系统日志（默认区域）
firewall-cmd --permanent --add-rich-rule='
rule family="ipv4"
port protocol="tcp" port="443"
log prefix="HTTPS Traffic: " level="info"
accept
'
firewall-cmd --reload
# 查看日志（CentOS/RHEL）
tail -f /var/log/messages | grep "HTTPS Traffic"
```

## <font style="color:rgb(0, 0, 0);background-color:rgba(0, 0, 0, 0);">四、高级功能配置</font>
### <font style="color:rgb(0, 0, 0);background-color:rgba(0, 0, 0, 0);">1. 端口转发（Port Forwarding）</font>
<font style="color:rgb(0, 0, 0);background-color:rgba(0, 0, 0, 0);">将防火墙的某个端口转发到内网其他主机的端口（需先开启 “伪装” 功能）。</font>

**<font style="color:rgba(0, 0, 0, 0.85);background-color:rgb(252, 252, 252);">bash</font>**

```bash
# 1. 永久开启默认区域的伪装（NAT）功能
firewall-cmd --permanent --add-masquerade
firewall-cmd --reload

# 2. 永久将防火墙的80端口（HTTP）转发到内网192.168.1.200的8080端口
firewall-cmd --permanent --add-forward-port=port=80:proto=tcp:toaddr=192.168.1.200:toport=8080
firewall-cmd --reload

# 3. 永久移除端口转发规则
firewall-cmd --permanent --remove-forward-port=port=80:proto=tcp:toaddr=192.168.1.200:toport=8080
firewall-cmd --reload
```

### <font style="color:rgb(0, 0, 0);background-color:rgba(0, 0, 0, 0);">2. 自定义服务</font>
<font style="color:rgb(0, 0, 0);background-color:rgba(0, 0, 0, 0);">若</font><font style="color:rgb(0, 0, 0);background-color:rgba(0, 0, 0, 0);"> </font>`<font style="color:rgb(0, 0, 0);background-color:rgba(0, 0, 0, 0);">firewalld</font>`<font style="color:rgb(0, 0, 0);background-color:rgba(0, 0, 0, 0);"> </font><font style="color:rgb(0, 0, 0);background-color:rgba(0, 0, 0, 0);">预定义服务中没有所需服务（如自定义的 1234 端口服务），可手动添加自定义服务。</font>

**<font style="color:rgba(0, 0, 0, 0.85);background-color:rgb(252, 252, 252);">bash</font>**

```bash
# 1. 复制预定义服务模板到自定义服务目录
cp /usr/lib/firewalld/services/ssh.xml /etc/firewalld/services/my-service.xml

# 2. 编辑自定义服务（修改端口和名称）
vim /etc/firewalld/services/my-service.xml
# 修改内容如下（端口1234，协议tcp）：
<service>
  <short>My Custom Service</short>
  <description>My custom service on port 1234/tcp</description>
  <port protocol="tcp" port="1234"/>
</service>

# 3. 重新加载firewalld配置
firewall-cmd --reload

# 4. 永久允许自定义服务（默认区域）
firewall-cmd --permanent --add-service=my-service
firewall-cmd --reload
```

## <font style="color:rgb(0, 0, 0);background-color:rgba(0, 0, 0, 0);">五、配置注意事项</font>
1. **<font style="color:rgb(0, 0, 0);background-color:rgba(0, 0, 0, 0);">区分临时与永久规则</font>**<font style="color:rgb(0, 0, 0);background-color:rgba(0, 0, 0, 0);">：</font>
    - <font style="color:rgb(0, 0, 0);background-color:rgba(0, 0, 0, 0);">临时规则（无</font><font style="color:rgb(0, 0, 0);background-color:rgba(0, 0, 0, 0);"> </font>`<font style="color:rgb(0, 0, 0);background-color:rgba(0, 0, 0, 0);">--permanent</font>`<font style="color:rgb(0, 0, 0);background-color:rgba(0, 0, 0, 0);">）：重启</font><font style="color:rgb(0, 0, 0);background-color:rgba(0, 0, 0, 0);"> </font>`<font style="color:rgb(0, 0, 0);background-color:rgba(0, 0, 0, 0);">firewalld</font>`<font style="color:rgb(0, 0, 0);background-color:rgba(0, 0, 0, 0);"> </font><font style="color:rgb(0, 0, 0);background-color:rgba(0, 0, 0, 0);">或服务器后失效，适合测试场景；</font>
    - <font style="color:rgb(0, 0, 0);background-color:rgba(0, 0, 0, 0);">永久规则（有</font><font style="color:rgb(0, 0, 0);background-color:rgba(0, 0, 0, 0);"> </font>`<font style="color:rgb(0, 0, 0);background-color:rgba(0, 0, 0, 0);">--permanent</font>`<font style="color:rgb(0, 0, 0);background-color:rgba(0, 0, 0, 0);">）：需执行</font><font style="color:rgb(0, 0, 0);background-color:rgba(0, 0, 0, 0);"> </font>`<font style="color:rgb(0, 0, 0);background-color:rgba(0, 0, 0, 0);">firewall-cmd --reload</font>`<font style="color:rgb(0, 0, 0);background-color:rgba(0, 0, 0, 0);"> </font><font style="color:rgb(0, 0, 0);background-color:rgba(0, 0, 0, 0);">生效，重启后仍保留，生产环境必用。</font>
2. **<font style="color:rgb(0, 0, 0);background-color:rgba(0, 0, 0, 0);">先放行关键服务</font>**<font style="color:rgb(0, 0, 0);background-color:rgba(0, 0, 0, 0);">：远程管理服务器时，需先确保</font><font style="color:rgb(0, 0, 0);background-color:rgba(0, 0, 0, 0);"> </font>`<font style="color:rgb(0, 0, 0);background-color:rgba(0, 0, 0, 0);">ssh</font>`<font style="color:rgb(0, 0, 0);background-color:rgba(0, 0, 0, 0);"> </font><font style="color:rgb(0, 0, 0);background-color:rgba(0, 0, 0, 0);">服务已允许（默认允许），避免配置失误导致无法远程登录（若误删 SSH 规则，需通过控制台修复）。</font>
3. **<font style="color:rgb(0, 0, 0);background-color:rgba(0, 0, 0, 0);">最小权限原则</font>**<font style="color:rgb(0, 0, 0);background-color:rgba(0, 0, 0, 0);">：仅开放业务必需的服务 / 端口，如数据库（MySQL、Redis）仅允许内网 IP 访问，不对外暴露；Web 服务仅开放 80/443 端口。</font>
4. **<font style="color:rgb(0, 0, 0);background-color:rgba(0, 0, 0, 0);">结合日志排查问题</font>**<font style="color:rgb(0, 0, 0);background-color:rgba(0, 0, 0, 0);">：若服务无法访问，可通过富规则添加日志记录，或查看</font><font style="color:rgb(0, 0, 0);background-color:rgba(0, 0, 0, 0);"> </font>`<font style="color:rgb(0, 0, 0);background-color:rgba(0, 0, 0, 0);">firewalld</font>`<font style="color:rgb(0, 0, 0);background-color:rgba(0, 0, 0, 0);"> </font><font style="color:rgb(0, 0, 0);background-color:rgba(0, 0, 0, 0);">日志（</font>`<font style="color:rgb(0, 0, 0);background-color:rgba(0, 0, 0, 0);">/var/log/firewalld</font>`<font style="color:rgb(0, 0, 0);background-color:rgba(0, 0, 0, 0);">），定位被阻断的流量。</font>
5. **<font style="color:rgb(0, 0, 0);background-color:rgba(0, 0, 0, 0);">避免与 iptables 冲突</font>**<font style="color:rgb(0, 0, 0);background-color:rgba(0, 0, 0, 0);">：</font>`<font style="color:rgb(0, 0, 0);background-color:rgba(0, 0, 0, 0);">firewalld</font>`<font style="color:rgb(0, 0, 0);background-color:rgba(0, 0, 0, 0);"> </font><font style="color:rgb(0, 0, 0);background-color:rgba(0, 0, 0, 0);">是</font><font style="color:rgb(0, 0, 0);background-color:rgba(0, 0, 0, 0);"> </font>`<font style="color:rgb(0, 0, 0);background-color:rgba(0, 0, 0, 0);">iptables</font>`<font style="color:rgb(0, 0, 0);background-color:rgba(0, 0, 0, 0);"> </font><font style="color:rgb(0, 0, 0);background-color:rgba(0, 0, 0, 0);">的上层管理工具，二者不能同时启用。若需切换到</font><font style="color:rgb(0, 0, 0);background-color:rgba(0, 0, 0, 0);"> </font>`<font style="color:rgb(0, 0, 0);background-color:rgba(0, 0, 0, 0);">iptables</font>`<font style="color:rgb(0, 0, 0);background-color:rgba(0, 0, 0, 0);">，需先停止并禁用</font><font style="color:rgb(0, 0, 0);background-color:rgba(0, 0, 0, 0);"> </font>`<font style="color:rgb(0, 0, 0);background-color:rgba(0, 0, 0, 0);">firewalld</font>`<font style="color:rgb(0, 0, 0);background-color:rgba(0, 0, 0, 0);">，再安装</font><font style="color:rgb(0, 0, 0);background-color:rgba(0, 0, 0, 0);"> </font>`<font style="color:rgb(0, 0, 0);background-color:rgba(0, 0, 0, 0);">iptables-services</font>`<font style="color:rgb(0, 0, 0);background-color:rgba(0, 0, 0, 0);">。</font>

<font style="color:rgb(0, 0, 0);background-color:rgba(0, 0, 0, 0);">通过</font><font style="color:rgb(0, 0, 0);background-color:rgba(0, 0, 0, 0);"> </font>`<font style="color:rgb(0, 0, 0);background-color:rgba(0, 0, 0, 0);">firewalld</font>`<font style="color:rgb(0, 0, 0);background-color:rgba(0, 0, 0, 0);"> </font><font style="color:rgb(0, 0, 0);background-color:rgba(0, 0, 0, 0);">的区域和动态规则特性，可灵活应对不同网络环境的安全需求，尤其适合需要频繁调整规则的生产环境。实际配置时，需根据业务场景选择合适的区域，并结合富规则实现精细化防护。</font>

<font style="color:rgb(31, 35, 41);background-color:rgb(252, 252, 252);">  
</font>


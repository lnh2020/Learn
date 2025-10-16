## <font style="color:rgb(0, 0, 0);background-color:rgb(252, 252, 252);">1. 什么是 Cron？</font>
<font style="color:rgb(0, 0, 0);background-color:rgb(252, 252, 252);">Cron 是 Linux 系统中用于周期性执行任务的服务，可按照预设时间自动运行命令或脚本，适用于自动化备份、日志清理、系统监控等场景。</font>

## <font style="color:rgb(0, 0, 0);background-color:rgb(252, 252, 252);">2. Crontab 语法格式</font>
**<font style="color:rgba(0, 0, 0, 0.85);background-color:rgb(252, 252, 252);">plaintext</font>**

```plain
* * * * * command
- - - - -
| | | | |
| | | | +-- 星期 (0-6 或 7，0和7都代表周日)
| | | +---- 月份 (1-12)
| | +------ 日期 (1-31)
| +-------- 小时 (0-23)
+---------- 分钟 (0-59)
```

### <font style="color:rgb(0, 0, 0);background-color:rgb(252, 252, 252);">特殊符号说明</font>
| **<font style="color:rgb(0, 0, 0);background-color:rgb(252, 252, 252);">符号</font>** | **<font style="color:rgb(0, 0, 0);background-color:rgb(252, 252, 252);">含义</font>** |
| :--- | :--- |
| `<font style="color:rgb(0, 0, 0);background-color:rgb(252, 252, 252);">*</font>` | <font style="color:rgb(0, 0, 0);background-color:rgb(252, 252, 252);">匹配所有可能的值</font> |
| `<font style="color:rgb(0, 0, 0);background-color:rgb(252, 252, 252);">,</font>` | <font style="color:rgb(0, 0, 0);background-color:rgb(252, 252, 252);">分隔多个值（如</font><font style="color:rgb(0, 0, 0);background-color:rgb(252, 252, 252);"> </font>`<font style="color:rgb(0, 0, 0);background-color:rgb(252, 252, 252);">1,3,5</font>`<br/><font style="color:rgb(0, 0, 0);background-color:rgb(252, 252, 252);">）</font> |
| `<font style="color:rgb(0, 0, 0);background-color:rgb(252, 252, 252);">-</font>` | <font style="color:rgb(0, 0, 0);background-color:rgb(252, 252, 252);">指定范围（如</font><font style="color:rgb(0, 0, 0);background-color:rgb(252, 252, 252);"> </font>`<font style="color:rgb(0, 0, 0);background-color:rgb(252, 252, 252);">1-5</font>`<br/><font style="color:rgb(0, 0, 0);background-color:rgb(252, 252, 252);">）</font> |
| `<font style="color:rgb(0, 0, 0);background-color:rgb(252, 252, 252);">/</font>` | <font style="color:rgb(0, 0, 0);background-color:rgb(252, 252, 252);">指定间隔（如</font><font style="color:rgb(0, 0, 0);background-color:rgb(252, 252, 252);"> </font>`<font style="color:rgb(0, 0, 0);background-color:rgb(252, 252, 252);">*/10</font>`<br/><font style="color:rgb(0, 0, 0);background-color:rgb(252, 252, 252);"> </font><font style="color:rgb(0, 0, 0);background-color:rgb(252, 252, 252);">表示每 10 个单位）</font> |


## <font style="color:rgb(0, 0, 0);background-color:rgb(252, 252, 252);">3. 常用命令</font>
**<font style="color:rgba(0, 0, 0, 0.85);background-color:rgb(252, 252, 252);">bash</font>**

```bash
# 查看当前用户的定时任务
crontab -l

# 编辑当前用户的定时任务（会打开默认编辑器）
crontab -e

# 删除当前用户的所有定时任务
crontab -r

# 查看指定用户的定时任务（需 root 权限）
crontab -u username -l
```

## <font style="color:rgb(0, 0, 0);background-color:rgb(252, 252, 252);">4. 实用示例</font>
### <font style="color:rgb(0, 0, 0);background-color:rgb(252, 252, 252);">基础示例</font>
**<font style="color:rgba(0, 0, 0, 0.85);background-color:rgb(252, 252, 252);">bash</font>**

```bash
# 每分钟执行一次命令
* * * * * /usr/bin/echo "Hello World"

# 每天凌晨 3 点执行脚本
0 3 * * * /home/user/backup.sh

# 每周一上午 8:30 执行
30 8 * * 1 /home/user/check_system.sh
```

### <font style="color:rgb(0, 0, 0);background-color:rgb(252, 252, 252);">进阶示例</font>
**<font style="color:rgba(0, 0, 0, 0.85);background-color:rgb(252, 252, 252);">bash</font>**

```bash
# 每月 1 日和 15 日的 12:00 执行
0 12 1,15 * * /home/user/backup_data.sh

# 每小时的第 15 分钟执行
15 * * * * /home/user/clean_temp.sh

# 工作日（周一至周五）的 9:00 执行
0 9 * * 1-5 /home/user/send_report.sh

# 每天 8:00 到 18:00 之间，每 2 小时执行一次
0 8-18/2 * * * /home/user/monitor_service.sh
```

### <font style="color:rgb(0, 0, 0);background-color:rgb(252, 252, 252);">输出重定向示例</font>
**<font style="color:rgba(0, 0, 0, 0.85);background-color:rgb(252, 252, 252);">bash</font>**

```bash
# 将输出保存到日志文件（包含错误信息）
0 0 * * * /home/user/backup.sh >> /var/log/backup.log 2>&1

# 忽略所有输出
0 0 * * * /home/user/cleanup.sh > /dev/null 2>&1
```

## <font style="color:rgb(0, 0, 0);background-color:rgb(252, 252, 252);">5. 注意事项</font>
+ <font style="color:rgb(0, 0, 0);background-color:rgb(252, 252, 252);">脚本必须设置可执行权限：</font>`<font style="color:rgb(0, 0, 0);background-color:rgb(252, 252, 252);">chmod +x script.sh</font>`
+ <font style="color:rgb(0, 0, 0);background-color:rgb(252, 252, 252);">尽量使用绝对路径（命令和文件路径）</font>
+ <font style="color:rgb(0, 0, 0);background-color:rgb(252, 252, 252);">系统级定时任务通常放在</font><font style="color:rgb(0, 0, 0);background-color:rgb(252, 252, 252);"> </font>`<font style="color:rgb(0, 0, 0);background-color:rgb(252, 252, 252);">/etc/cron.d/</font>`<font style="color:rgb(0, 0, 0);background-color:rgb(252, 252, 252);"> </font><font style="color:rgb(0, 0, 0);background-color:rgb(252, 252, 252);">目录</font>
+ <font style="color:rgb(0, 0, 0);background-color:rgb(252, 252, 252);">任务执行结果默认通过邮件发送给用户（需配置邮件服务）</font>
+ <font style="color:rgb(0, 0, 0);background-color:rgb(252, 252, 252);">修改 crontab 后无需重启服务，会自动生效</font>

<font style="color:rgb(0, 0, 0);background-color:rgb(252, 252, 252);">通过合理配置 Cron 任务，可以极大提高系统管理效率，减少重复性操作。</font>


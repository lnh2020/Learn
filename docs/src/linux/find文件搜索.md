`<font style="color:rgb(0, 0, 0);background-color:rgb(252, 252, 252);">find</font>`<font style="color:rgb(0, 0, 0);background-color:rgb(252, 252, 252);"> 是 Linux 系统中强大的文件搜索命令，用于在指定目录下根据各种条件（如名称、大小、权限、修改时间等）查找文件或目录。以下是其核心用法：</font>

### <font style="color:rgb(0, 0, 0);background-color:rgb(252, 252, 252);">基本语法</font>
**<font style="color:rgb(249, 250, 251);background-color:rgb(252, 252, 252);">bash</font>**

```bash
find 搜索路径 [选项] 搜索条件 [动作]
```

+ **<font style="color:rgb(0, 0, 0);background-color:rgb(252, 252, 252);">搜索路径</font>**<font style="color:rgb(0, 0, 0);background-color:rgb(252, 252, 252);">：指定要搜索的目录（默认为当前目录</font><font style="color:rgb(0, 0, 0);background-color:rgb(252, 252, 252);"> </font>`<font style="color:rgb(0, 0, 0);background-color:rgb(252, 252, 252);">.</font>`<font style="color:rgb(0, 0, 0);background-color:rgb(252, 252, 252);">）</font>
+ **<font style="color:rgb(0, 0, 0);background-color:rgb(252, 252, 252);">搜索条件</font>**<font style="color:rgb(0, 0, 0);background-color:rgb(252, 252, 252);">：定义查找规则（如名称、类型、大小等）</font>
+ **<font style="color:rgb(0, 0, 0);background-color:rgb(252, 252, 252);">动作</font>**<font style="color:rgb(0, 0, 0);background-color:rgb(252, 252, 252);">：对找到的文件执行操作（如删除、复制等，默认是显示路径）</font>

### <font style="color:rgb(0, 0, 0);background-color:rgb(252, 252, 252);">常用搜索条件及示例</font>
#### <font style="color:rgb(0, 0, 0);background-color:rgb(252, 252, 252);">1. 按文件名搜索（最常用）</font>
+ `<font style="color:rgb(0, 0, 0);background-color:rgb(252, 252, 252);">-name "文件名"</font>`<font style="color:rgb(0, 0, 0);background-color:rgb(252, 252, 252);">：精确匹配文件名（区分大小写）</font>
+ `<font style="color:rgb(0, 0, 0);background-color:rgb(252, 252, 252);">-iname "文件名"</font>`<font style="color:rgb(0, 0, 0);background-color:rgb(252, 252, 252);">：忽略大小写匹配</font>

**<font style="color:rgb(249, 250, 251);background-color:rgb(252, 252, 252);">bash</font>**

```bash
# 在当前目录搜索名为 "config.ini" 的文件
find . -name "config.ini"

# 在 /etc 目录搜索所有 .conf 结尾的文件（忽略大小写）
find /etc -iname "*.conf"
```

#### <font style="color:rgb(0, 0, 0);background-color:rgb(252, 252, 252);">2. 按文件类型搜索</font>
+ `<font style="color:rgb(0, 0, 0);background-color:rgb(252, 252, 252);">-type f</font>`<font style="color:rgb(0, 0, 0);background-color:rgb(252, 252, 252);">：普通文件</font>
+ `<font style="color:rgb(0, 0, 0);background-color:rgb(252, 252, 252);">-type d</font>`<font style="color:rgb(0, 0, 0);background-color:rgb(252, 252, 252);">：目录</font>
+ `<font style="color:rgb(0, 0, 0);background-color:rgb(252, 252, 252);">-type l</font>`<font style="color:rgb(0, 0, 0);background-color:rgb(252, 252, 252);">：符号链接</font>
+ `<font style="color:rgb(0, 0, 0);background-color:rgb(252, 252, 252);">-type b</font>`<font style="color:rgb(0, 0, 0);background-color:rgb(252, 252, 252);">：块设备</font>
+ `<font style="color:rgb(0, 0, 0);background-color:rgb(252, 252, 252);">-type c</font>`<font style="color:rgb(0, 0, 0);background-color:rgb(252, 252, 252);">：字符设备</font>

**<font style="color:rgb(249, 250, 251);background-color:rgb(252, 252, 252);">bash</font>**

```bash
# 在 /var 目录搜索所有目录
find /var -type d

# 在当前目录搜索所有 .sh 结尾的可执行文件
find . -type f -name "*.sh"
```

#### <font style="color:rgb(0, 0, 0);background-color:rgb(252, 252, 252);">3. 按文件大小搜索</font>
+ `<font style="color:rgb(0, 0, 0);background-color:rgb(252, 252, 252);">-size [+/-]大小</font>`<font style="color:rgb(0, 0, 0);background-color:rgb(252, 252, 252);">：</font>`<font style="color:rgb(0, 0, 0);background-color:rgb(252, 252, 252);">+</font>`<font style="color:rgb(0, 0, 0);background-color:rgb(252, 252, 252);"> </font><font style="color:rgb(0, 0, 0);background-color:rgb(252, 252, 252);">表示大于，</font>`<font style="color:rgb(0, 0, 0);background-color:rgb(252, 252, 252);">-</font>`<font style="color:rgb(0, 0, 0);background-color:rgb(252, 252, 252);"> </font><font style="color:rgb(0, 0, 0);background-color:rgb(252, 252, 252);">表示小于</font>
+ <font style="color:rgb(0, 0, 0);background-color:rgb(252, 252, 252);">单位：</font>`<font style="color:rgb(0, 0, 0);background-color:rgb(252, 252, 252);">b</font>`<font style="color:rgb(0, 0, 0);background-color:rgb(252, 252, 252);">（字节）、</font>`<font style="color:rgb(0, 0, 0);background-color:rgb(252, 252, 252);">k</font>`<font style="color:rgb(0, 0, 0);background-color:rgb(252, 252, 252);">（KB）、</font>`<font style="color:rgb(0, 0, 0);background-color:rgb(252, 252, 252);">M</font>`<font style="color:rgb(0, 0, 0);background-color:rgb(252, 252, 252);">（MB）、</font>`<font style="color:rgb(0, 0, 0);background-color:rgb(252, 252, 252);">G</font>`<font style="color:rgb(0, 0, 0);background-color:rgb(252, 252, 252);">（GB）（默认单位是 512 字节块）</font>

**<font style="color:rgb(249, 250, 251);background-color:rgb(252, 252, 252);">bash</font>**

```bash
# 搜索当前目录下大于 100MB 的文件
find . -type f -size +100M

# 搜索 /tmp 目录下小于 10KB 的文件
find /tmp -type f -size -10k
```

#### <font style="color:rgb(0, 0, 0);background-color:rgb(252, 252, 252);">4. 按修改时间搜索</font>
+ `<font style="color:rgb(0, 0, 0);background-color:rgb(252, 252, 252);">-mtime [+/-]天数</font>`<font style="color:rgb(0, 0, 0);background-color:rgb(252, 252, 252);">：按内容修改时间（天）</font>
+ `<font style="color:rgb(0, 0, 0);background-color:rgb(252, 252, 252);">-mmin [+/-]分钟</font>`<font style="color:rgb(0, 0, 0);background-color:rgb(252, 252, 252);">：按内容修改时间（分钟）</font>
+ <font style="color:rgb(0, 0, 0);background-color:rgb(252, 252, 252);">类似：</font>`<font style="color:rgb(0, 0, 0);background-color:rgb(252, 252, 252);">-atime</font>`<font style="color:rgb(0, 0, 0);background-color:rgb(252, 252, 252);">（访问时间）、</font>`<font style="color:rgb(0, 0, 0);background-color:rgb(252, 252, 252);">-ctime</font>`<font style="color:rgb(0, 0, 0);background-color:rgb(252, 252, 252);">（状态变更时间）</font>

**<font style="color:rgb(249, 250, 251);background-color:rgb(252, 252, 252);">bash</font>**

```bash
# 搜索最近 7 天内修改过的文件
find . -type f -mtime -7

# 搜索 30 天前修改过的日志文件
find /var/log -name "*.log" -mtime +30

# 搜索 1 小时内修改过的配置文件
find /etc -name "*.conf" -mmin -60
```

#### <font style="color:rgb(0, 0, 0);background-color:rgb(252, 252, 252);">5. 按权限搜索</font>
+ `<font style="color:rgb(0, 0, 0);background-color:rgb(252, 252, 252);">-perm 权限值</font>`<font style="color:rgb(0, 0, 0);background-color:rgb(252, 252, 252);">：精确匹配权限（如 644、755）</font>
+ `<font style="color:rgb(0, 0, 0);background-color:rgb(252, 252, 252);">-perm -权限值</font>`<font style="color:rgb(0, 0, 0);background-color:rgb(252, 252, 252);">：文件权限包含指定权限（至少有这些权限）</font>

**<font style="color:rgb(249, 250, 251);background-color:rgb(252, 252, 252);">bash</font>**

```bash
# 搜索权限为 777 的文件（危险权限）
find / -type f -perm 777

# 搜索所有者有写权限的文件
find . -type f -perm -u+w
```

#### <font style="color:rgb(0, 0, 0);background-color:rgb(252, 252, 252);">6. 按所有者 / 所属组搜索</font>
+ `<font style="color:rgb(0, 0, 0);background-color:rgb(252, 252, 252);">-user 用户名</font>`<font style="color:rgb(0, 0, 0);background-color:rgb(252, 252, 252);">：按所有者查找</font>
+ `<font style="color:rgb(0, 0, 0);background-color:rgb(252, 252, 252);">-group 组名</font>`<font style="color:rgb(0, 0, 0);background-color:rgb(252, 252, 252);">：按所属组查找</font>

**<font style="color:rgb(249, 250, 251);background-color:rgb(252, 252, 252);">bash</font>**

```bash
# 搜索所有者为 root 的文件
find /home -user root

# 搜索所属组为 developers 的目录
find /data -type d -group developers
```

### <font style="color:rgb(0, 0, 0);background-color:rgb(252, 252, 252);">常用动作（对搜索结果执行操作）</font>
1. **<font style="color:rgb(0, 0, 0);background-color:rgb(252, 252, 252);">删除文件</font>**<font style="color:rgb(0, 0, 0);background-color:rgb(252, 252, 252);">：</font>`<font style="color:rgb(0, 0, 0);background-color:rgb(252, 252, 252);">-delete</font>`<font style="color:rgb(0, 0, 0);background-color:rgb(252, 252, 252);">（直接删除找到的文件，慎用！）</font>**<font style="color:rgb(249, 250, 251);background-color:rgb(252, 252, 252);">bash</font>**

```bash
# 删除当前目录下 30 天前的 .tmp 临时文件
find . -name "*.tmp" -mtime +30 -delete
```

2. **<font style="color:rgb(0, 0, 0);background-color:rgb(252, 252, 252);">执行命令</font>**<font style="color:rgb(0, 0, 0);background-color:rgb(252, 252, 252);">：</font>`<font style="color:rgb(0, 0, 0);background-color:rgb(252, 252, 252);">-exec 命令 {} \;</font>`<font style="color:rgb(0, 0, 0);background-color:rgb(252, 252, 252);">（</font>`<font style="color:rgb(0, 0, 0);background-color:rgb(252, 252, 252);">{}</font>`<font style="color:rgb(0, 0, 0);background-color:rgb(252, 252, 252);"> </font><font style="color:rgb(0, 0, 0);background-color:rgb(252, 252, 252);">代表找到的文件，</font>`<font style="color:rgb(0, 0, 0);background-color:rgb(252, 252, 252);">\;</font>`<font style="color:rgb(0, 0, 0);background-color:rgb(252, 252, 252);"> </font><font style="color:rgb(0, 0, 0);background-color:rgb(252, 252, 252);">是命令结束符）</font>**<font style="color:rgb(249, 250, 251);background-color:rgb(252, 252, 252);">bash</font>**

```bash
# 搜索所有 .txt 文件并查看其详细信息（类似 ls -l）
find . -name "*.txt" -exec ls -l {} \;

# 复制找到的 log 文件到 /backup 目录
find /var/log -name "*.log" -exec cp {} /backup \;
```

3. **<font style="color:rgb(0, 0, 0);background-color:rgb(252, 252, 252);">结合管道</font>**<font style="color:rgb(0, 0, 0);background-color:rgb(252, 252, 252);">：将结果传递给其他命令处理</font>**<font style="color:rgb(249, 250, 251);background-color:rgb(252, 252, 252);">bash</font>**

```bash
# 搜索大文件并排序（查看前 10 个最大文件）
find / -type f -size +1G -exec du -h {} \; | sort -rh | head -n 10
```

### <font style="color:rgb(0, 0, 0);background-color:rgb(252, 252, 252);">高级用法示例</font>
**<font style="color:rgb(249, 250, 251);background-color:rgb(252, 252, 252);">bash</font>**

```bash
# 复杂条件：搜索 /data 目录下，属于 user1 且 7 天内修改过的、大于 10MB 的 .tar.gz 文件
find /data -type f -user user1 -mtime -7 -size +10M -name "*.tar.gz"

# 排除目录：搜索时跳过 node_modules 目录
find . -path "./node_modules" -prune -o -name "*.js" -print
```

`<font style="color:rgb(0, 0, 0);background-color:rgb(252, 252, 252);">find</font>`<font style="color:rgb(0, 0, 0);background-color:rgb(252, 252, 252);"> 命令功能非常强大，通过组合不同条件可以实现精准的文件搜索，是系统管理和日常操作中不可或缺的工具。使用时注意：搜索根目录（</font>`<font style="color:rgb(0, 0, 0);background-color:rgb(252, 252, 252);">/</font>`<font style="color:rgb(0, 0, 0);background-color:rgb(252, 252, 252);">）可能需要管理员权限；删除操作（</font>`<font style="color:rgb(0, 0, 0);background-color:rgb(252, 252, 252);">-delete</font>`<font style="color:rgb(0, 0, 0);background-color:rgb(252, 252, 252);">）务必谨慎，建议先不加 </font>`<font style="color:rgb(0, 0, 0);background-color:rgb(252, 252, 252);">-delete</font>`<font style="color:rgb(0, 0, 0);background-color:rgb(252, 252, 252);"> 确认结果再执行。</font>


`<font style="color:rgb(0, 0, 0);background-color:rgb(252, 252, 252);">grep</font>`<font style="color:rgb(0, 0, 0);background-color:rgb(252, 252, 252);"> 是 Linux 系统中强大的文本搜索工具，用于在文件或输入流中查找匹配指定模式（字符串或正则表达式）的内容。以下是其常用用法：</font>

### <font style="color:rgb(0, 0, 0);background-color:rgb(252, 252, 252);">基本语法</font>
**<font style="color:rgb(249, 250, 251);background-color:rgb(252, 252, 252);">bash</font>**

```bash
grep [选项] "搜索模式" 文件名/目录
```

### <font style="color:rgb(0, 0, 0);background-color:rgb(252, 252, 252);">常用选项</font>
+ `<font style="color:rgb(0, 0, 0);background-color:rgb(252, 252, 252);">-i</font>`<font style="color:rgb(0, 0, 0);background-color:rgb(252, 252, 252);">：忽略大小写（不区分大小写搜索）</font>
+ `<font style="color:rgb(0, 0, 0);background-color:rgb(252, 252, 252);">-n</font>`<font style="color:rgb(0, 0, 0);background-color:rgb(252, 252, 252);">：显示匹配行的行号</font>
+ `<font style="color:rgb(0, 0, 0);background-color:rgb(252, 252, 252);">-v</font>`<font style="color:rgb(0, 0, 0);background-color:rgb(252, 252, 252);">：反向匹配（显示不包含模式的行）</font>
+ `<font style="color:rgb(0, 0, 0);background-color:rgb(252, 252, 252);">-r</font>`<font style="color:rgb(0, 0, 0);background-color:rgb(252, 252, 252);"> </font><font style="color:rgb(0, 0, 0);background-color:rgb(252, 252, 252);">或</font><font style="color:rgb(0, 0, 0);background-color:rgb(252, 252, 252);"> </font>`<font style="color:rgb(0, 0, 0);background-color:rgb(252, 252, 252);">-R</font>`<font style="color:rgb(0, 0, 0);background-color:rgb(252, 252, 252);">：递归搜索目录下的所有文件</font>
+ `<font style="color:rgb(0, 0, 0);background-color:rgb(252, 252, 252);">-w</font>`<font style="color:rgb(0, 0, 0);background-color:rgb(252, 252, 252);">：精确匹配整个单词（避免匹配单词的一部分）</font>
+ `<font style="color:rgb(0, 0, 0);background-color:rgb(252, 252, 252);">-E</font>`<font style="color:rgb(0, 0, 0);background-color:rgb(252, 252, 252);">：启用扩展正则表达式（支持</font><font style="color:rgb(0, 0, 0);background-color:rgb(252, 252, 252);"> </font>`<font style="color:rgb(0, 0, 0);background-color:rgb(252, 252, 252);">|</font>`<font style="color:rgb(0, 0, 0);background-color:rgb(252, 252, 252);">、</font>`<font style="color:rgb(0, 0, 0);background-color:rgb(252, 252, 252);">()</font>`<font style="color:rgb(0, 0, 0);background-color:rgb(252, 252, 252);"> </font><font style="color:rgb(0, 0, 0);background-color:rgb(252, 252, 252);">等元字符）</font>
+ `<font style="color:rgb(0, 0, 0);background-color:rgb(252, 252, 252);">-o</font>`<font style="color:rgb(0, 0, 0);background-color:rgb(252, 252, 252);">：只显示匹配的部分（而非整行）</font>
+ `<font style="color:rgb(0, 0, 0);background-color:rgb(252, 252, 252);">-c</font>`<font style="color:rgb(0, 0, 0);background-color:rgb(252, 252, 252);">：统计匹配的行数</font>

### <font style="color:rgb(0, 0, 0);background-color:rgb(252, 252, 252);">示例用法</font>
#### <font style="color:rgb(0, 0, 0);background-color:rgb(252, 252, 252);">1. 基本文本搜索</font>
**<font style="color:rgb(249, 250, 251);background-color:rgb(252, 252, 252);">bash</font>**

```bash
# 在 file.txt 中搜索包含 "error" 的行
grep "error" file.txt

# 忽略大小写搜索（匹配 Error、ERROR 等）
grep -i "error" log.txt
```

#### <font style="color:rgb(0, 0, 0);background-color:rgb(252, 252, 252);">2. 显示行号与反向匹配</font>
**<font style="color:rgb(249, 250, 251);background-color:rgb(252, 252, 252);">bash</font>**

```bash
# 搜索 "success" 并显示行号
grep -n "success" result.txt

# 显示不包含 "warning" 的行（反向匹配）
grep -v "warning" system.log
```

#### <font style="color:rgb(0, 0, 0);background-color:rgb(252, 252, 252);">3. 递归搜索目录</font>
**<font style="color:rgb(249, 250, 251);background-color:rgb(252, 252, 252);">bash</font>**

```bash
# 递归搜索 /var/log 目录下所有文件中包含 "failed" 的行
grep -r "failed" /var/log

# 递归搜索时只显示文件名（不显示内容）
grep -rl "timeout" /etc
```

#### <font style="color:rgb(0, 0, 0);background-color:rgb(252, 252, 252);">4. 精确匹配与统计</font>
**<font style="color:rgb(249, 250, 251);background-color:rgb(252, 252, 252);">bash</font>**

```bash
# 精确匹配单词 "user"（不匹配 username、users 等）
grep -w "user" /etc/passwd

# 统计包含 "404" 的行数
grep -c "404" access.log
```

#### <font style="color:rgb(0, 0, 0);background-color:rgb(252, 252, 252);">5. 正则表达式搜索（</font>`<font style="color:rgb(0, 0, 0);background-color:rgb(252, 252, 252);">-E</font>`<font style="color:rgb(0, 0, 0);background-color:rgb(252, 252, 252);">）</font>
**<font style="color:rgb(249, 250, 251);background-color:rgb(252, 252, 252);">bash</font>**

```bash
# 搜索包含 "error" 或 "warning" 的行（扩展正则）
grep -E "error|warning" app.log

# 搜索以 "root" 开头的行
grep "^root" /etc/passwd

# 搜索以 ".html" 结尾的行
grep "\.html$" index.txt
```

#### <font style="color:rgb(0, 0, 0);background-color:rgb(252, 252, 252);">6. 结合管道使用</font>
**<font style="color:rgb(249, 250, 251);background-color:rgb(252, 252, 252);">bash</font>**

```bash
# 查看进程并搜索包含 "nginx" 的进程
ps aux | grep "nginx"

# 搜索多个文件并过滤结果
cat file1.txt file2.txt | grep -i "critical"
```

### <font style="color:rgb(0, 0, 0);background-color:rgb(252, 252, 252);">实用技巧</font>
+ <font style="color:rgb(0, 0, 0);background-color:rgb(252, 252, 252);">正则表达式元字符：</font>`<font style="color:rgb(0, 0, 0);background-color:rgb(252, 252, 252);">^</font>`<font style="color:rgb(0, 0, 0);background-color:rgb(252, 252, 252);">（行首）、</font>`<font style="color:rgb(0, 0, 0);background-color:rgb(252, 252, 252);">$</font>`<font style="color:rgb(0, 0, 0);background-color:rgb(252, 252, 252);">（行尾）、</font>`<font style="color:rgb(0, 0, 0);background-color:rgb(252, 252, 252);">.</font>`<font style="color:rgb(0, 0, 0);background-color:rgb(252, 252, 252);">（任意字符）、</font>`<font style="color:rgb(0, 0, 0);background-color:rgb(252, 252, 252);">*</font>`<font style="color:rgb(0, 0, 0);background-color:rgb(252, 252, 252);">（前一个字符重复 0 次或多次）、</font>`<font style="color:rgb(0, 0, 0);background-color:rgb(252, 252, 252);">[]</font>`<font style="color:rgb(0, 0, 0);background-color:rgb(252, 252, 252);">（字符集）等</font>
+ <font style="color:rgb(0, 0, 0);background-color:rgb(252, 252, 252);">转义特殊字符：用</font><font style="color:rgb(0, 0, 0);background-color:rgb(252, 252, 252);"> </font>`<font style="color:rgb(0, 0, 0);background-color:rgb(252, 252, 252);">\</font>`<font style="color:rgb(0, 0, 0);background-color:rgb(252, 252, 252);"> </font><font style="color:rgb(0, 0, 0);background-color:rgb(252, 252, 252);">转义</font><font style="color:rgb(0, 0, 0);background-color:rgb(252, 252, 252);"> </font>`<font style="color:rgb(0, 0, 0);background-color:rgb(252, 252, 252);">.</font>`<font style="color:rgb(0, 0, 0);background-color:rgb(252, 252, 252);">、</font>`<font style="color:rgb(0, 0, 0);background-color:rgb(252, 252, 252);">*</font>`<font style="color:rgb(0, 0, 0);background-color:rgb(252, 252, 252);"> </font><font style="color:rgb(0, 0, 0);background-color:rgb(252, 252, 252);">等元字符（如搜索</font><font style="color:rgb(0, 0, 0);background-color:rgb(252, 252, 252);"> </font>`<font style="color:rgb(0, 0, 0);background-color:rgb(252, 252, 252);">.log</font>`<font style="color:rgb(0, 0, 0);background-color:rgb(252, 252, 252);"> </font><font style="color:rgb(0, 0, 0);background-color:rgb(252, 252, 252);">需写成</font><font style="color:rgb(0, 0, 0);background-color:rgb(252, 252, 252);"> </font>`<font style="color:rgb(0, 0, 0);background-color:rgb(252, 252, 252);">\.log</font>`<font style="color:rgb(0, 0, 0);background-color:rgb(252, 252, 252);">）</font>
+ <font style="color:rgb(0, 0, 0);background-color:rgb(252, 252, 252);">排除目录：递归搜索时用</font><font style="color:rgb(0, 0, 0);background-color:rgb(252, 252, 252);"> </font>`<font style="color:rgb(0, 0, 0);background-color:rgb(252, 252, 252);">--exclude-dir</font>`<font style="color:rgb(0, 0, 0);background-color:rgb(252, 252, 252);"> </font><font style="color:rgb(0, 0, 0);background-color:rgb(252, 252, 252);">排除特定目录，如</font><font style="color:rgb(0, 0, 0);background-color:rgb(252, 252, 252);"> </font>`<font style="color:rgb(0, 0, 0);background-color:rgb(252, 252, 252);">grep -r "keyword" . --exclude-dir=node_modules</font>`

`<font style="color:rgb(0, 0, 0);background-color:rgb(252, 252, 252);">grep</font>`<font style="color:rgb(0, 0, 0);background-color:rgb(252, 252, 252);"> 是日志分析、配置文件检索的高效工具，灵活运用其选项和正则表达式能大幅提升文本处理效率。</font>


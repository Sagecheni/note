结合以上各位经验设置成功. 以下以macOS为准.
 
1. https访问  
>仅为github.com设置socks5代理(推荐这种方式, 公司内网就不用设代理了, 多此一举):  
>`git config --global http.https://github.com.proxysocks5://127.0.0.1:1086`  
>其中1086是socks5的监听端口, 这个可以配置的, 每个人不同, 在macOS上一般为1086.  
>设置完成后, ~/.gitconfig文件中会增加以下条目: 
>``` txt
>[http "https://github.com"]
>proxy = socks5://127.0.0.1:1086
>```
2. ssh访问  
>需要修改~/.ssh/config文件, 没有的话新建一个. 同样仅为github.com设置代理:
> 
>``` txt
>Host github.com
>	User git
>	ProxyCommand nc -v -x 127.0.0.1:1086 %h %p
>```
> 
> 如果是在Windows下, 则需要个性%home%.ssh\config, 其中内容类似于:
> 
> 
>
> ``` txt
> Host github.com 
> 	User git
> 	ProxyCommand connect -S 127.0.0.1:1086 %h %p
> ```	
>
>
>
> 这里-S表示使用socks5代理, 如果是http代理则为-H. connect工具git自带, 在\mingw64\bin\下面.
>    
>
>
> 
> 亲测可以，我的代理是Clash，端口改成默认的7890.  
> 记录下问题过程： Clash 一开始使用Git命令没问题，突然某天提示：
> 
> ```shell
> ssh: connect to host ssh.github.com port 22: Connection refused
> fatal: Could not read from remote repository.
> ```
> 
> win10配置：.ssh/config 配置文件供参考：
> 
> ``` txt
> Host github.com
> 	User git
> 	Hostname ssh.github.com
> 	PreferredAuthentications publickey
> 	IdentityFile ~/.ssh/id_rsa
> 	Port 22
> 	ProxyCommand nc -x 127.0.0.1:7890 %h %p
> ```

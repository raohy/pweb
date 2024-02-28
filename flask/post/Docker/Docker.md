# Docker

posted: 2024-01-31
updated: 2024-01-31

2024/1/31

[常用命令](https://www.notion.so/133e5f2b11ea4e67b29c1ac304403d0e?pvs=21)

根据 ‘’docker-从入门到实践‘’ 整理

links：[https://yeasy.gitbook.io/docker_practice/](https://yeasy.gitbook.io/docker_practice/)

## 简介

Docker使用Go语言进行开发实现，基于Linux内核的cgroup，namespace，以及OverlayFS类的Union FS技术，对进程进行封装隔离，属于操作系统层面的虚拟化技术。

![Untitled](Docker%20ed4e1c4cbd514622956161eaec8efaf5/Untitled.png)

跟传统的虚拟机不同的是，Docker只压缩应用文件和它的依赖，不对操作系统进行处理，所以相对便捷和高效

Docker的优势：

1. 更高效的利用系统资源
2. 更快速的启动时间
3. 一致的运行环境
4. 持续交付和部署
5. 更轻松的迁移
6. 更轻松的维护和扩展

## 镜像

首先介绍下linux的启动流程，`bootfs`（boot file system)主要包含bootloader和kernel，linxu启动后从BIOS的MBR扇区加载bootfs文件系统，存储有操作系统（OS）相关信息，如操作系统名称，操作系统内核位置等，它的主要功能是加载内核到内存中运行。(最常见的bootfs是GRUB),此时内存的使用权已由 bootfs 转交给内核，系统也会卸载 bootfs 。不同的Linux发行版，它们的bootfs基本是一致的。

`rootfs` (root file system) ，在 bootfs 之上。包含典型 Linux 系统中的 /dev 、/etc 、/var 、/bin 、/proc 、/usr 、/tmp 等标准目录和文件。不同的 Linux 发行版，主要包含不同的rootfs，bootfs基本上一致，比如 Ubuntu 和 CentOS 等。

Docker 镜像仅包含运行所需的最小 runtime 环境，即只包含 rootfs，底层可以直接共用 Host 主机的 kernel和bootfs。例如，本机系统是 Ubuntu 16.04，内核为kernel：4.x.x，那么在 CentOS7 docker容器中使用的实际是本机 4.x.x 的 kernel。

Docker镜像相当于是一个root文件系统，并且充分利用分层储存技术（UnionFS)。镜像构建时，会一层层的进行构建，构建完之后不会再发生改变。

镜像（Image）和容器（Container）的关系，就像是面向对象程序设计中的 类 和 实例 一样，镜像是静态的定义，容器是镜像运行时的实体，容器依照镜像来创建。

容器的实质是进程，但与直接在宿主执行的进程不同，容器进程运行于属于自己的独立的 命名空间。因此容器可以拥有自己的 root 文件系统、自己的网络配置、自己的进程空间，甚至自己的用户 ID 空间。

前面讲过镜像使用的是分层存储，容器也是如此。每一个容器运行时，是以镜像为基础层，在其上创建一个当前容器的存储层，我们可以称这个为容器运行时读写而准备的存储层为 **容器存储层**。存储层内保留着root文件系统，记录它们的状态。

### 

### 获取镜像

那么去哪里获取镜像呢？

Docker Registry是一个集中的存储、分发镜像的服务，可以包含多个仓库，以<仓库名>:<标签>的格式区分多个镜像

Docker Hub是 Registry 公开的官方服务，在上面可以下载到大量的高质量镜像，也可以搭建私有的仓库

`$ docker pull [选项] [Docker Registry 地址[:端口号]/]仓库名[:标签]`   从镜像仓库上获取镜像

![Untitled](Docker%20ed4e1c4cbd514622956161eaec8efaf5/Untitled%201.png)

镜像是一层层构建的，各个镜像相互独立，下载的时候也是一层层镜像逐级下载的，下载过程中给出每一层的前12位ID。

每个镜像只能在特定的计算机架构中运行的，比如说Linux x86_64或Linux arm64v8，那么该如何区分不同的计算机架构系统呢？

在Docker Hub中会维护一个manifest列表，当用户获取一个镜像时，Docker 引擎会首先查找该镜像是否有 manifest 列表，如果有的话 Docker 引擎会按照 Docker 运行环境（系统及架构）查找出对应镜像。如果没有的话会直接获取镜像。

`$ docker manifest inspect golang:alpine`        查看manifest列表

### 根据镜像运行容器

`$ docker run -it --rm ubuntu:18.04 bash`

tips：- - rm的意思是当退出容器的时候删除容器

### 列出本地存在的镜像

`$ docker image ls`

Docker Hub上显示的是经过压缩过后的镜像大小，所以一般会比下载下来的本地文件小，本地显示的是实际占用的磁盘空间大小。列的是顶层的镜像。

`$ docker image ls -a`

这样会看到很多无标签的镜像，与之前的虚悬镜像不同，这些无标签的镜像很多都是中间层镜像，是其它镜像所依赖的镜像。

`$ docker image ls -q`

列出镜像的ID，通向配合filter使用

`$ docker image ls -f since=mongo:3.2`

filter 过滤器参数

`$ docker system df` 

便捷的查看镜像、容器、数据卷所占用的空间。当旧镜像被取消时，镜像名可以会显示None，被称为虚悬镜像

`$ docker image prune`移除没有标签并且没有被容器引用的镜像(虚悬镜像)

### 删除镜像

`$ docker image rm [选项] <镜像1> [<镜像2> ...]`   删除镜像，可以选填镜像的ID，镜像名，镜像摘要

删除分为两类，untagged和deleted，untagged实际上是删除某个标签，当一个镜像的所有标签都被删除时，它也会被删除（如果它依赖的层还被其他层所使用，那么该层也就不会被删除）

`$ docker image rm $(docker image ls -q redis)`   删除所有仓库名为 `redis` 的镜像：

### 修改镜像

Docker 提供了一个 `docker commit` 命令，可以将容器的存储层保存下来成为镜像(docker 说白了储存的就是一个rootfs文件系统）。换句话说，就是在原有镜像的基础上，再叠加上容器的存储层，并构成新的镜像。以后我们运行这个新镜像的时候，就会拥有原有容器最后的文件变化。

docker commit 的语法格式为：

 `$ docker commit [选项] <容器ID或容器名> [<仓库名>[:<标签>]]`

我们还可以用 `$ docker history` 具体查看镜像内的历史记录。

### 基于dockerfile构建镜像

可以使用 `docker build` 命令进行镜像构建。其格式为：

`$ docker build [选项] <上下文路径/URL/->`

例如：

![Untitled](Docker%20ed4e1c4cbd514622956161eaec8efaf5/Untitled%202.png)

当构建的时候，用户会指定构建镜像上下文的路径，例如上面例子中的 ’.‘ 。`docker build` 命令得知这个路径后，会将路径下的所有内容打包，然后上传给 Docker 引擎（docker引擎也可以在本地）。dockerfile中所有的命令路径都是基于上下文路径的，不是运行路径！

### 修改dockerfile定制镜像

镜像的定制实际上就是定制每一层所添加的配置、文件。如果我们可以把每一层修改、安装、构建、操作的命令都写入一个脚本，用这个脚本来构建、定制镜像，那么之前提及的无法重复的问题、镜像构建透明性的问题、体积的问题就都会解决。这个脚本就是 Dockerfile。

### dockerfile 常用命令

`FROM` 命令指定基础镜像，基础镜像是必须要指定的。除了现有镜像之外，也可以选择空白镜像-scratch（只包含保证docker正常运行的最低标准，只能执行二进制程序）。FROM指令必须是dockerfile中第一条非注释命令。

不以任何系统为基础，直接将可执行文件复制进镜像的做法并不罕见，对于 Linux 下静态编译的程序来说，并不需要有操作系统提供运行时支持，所需的一切库都已经在可执行文件里了，因此直接 `FROM scratch` 会让镜像体积更加小巧。

`RUN` 指令是用来执行命令行命令的。由于命令行的强大能力，RUN 指令在定制镜像时是最常用的指令之一。在dockerfile中，每一个 `RUN` 指令都启动一个容器、执行命令、然后提交存储层文件变更。最多127层。run用于执行后面跟着的命令行命令。有以下两种格式：

shell 格式：

```docker
RUN <命令行命令>
# <命令行命令> 等同于，在终端操作的 shell 命令。
```

exec 格式：

```docker
RUN ["可执行文件", "参数1", "参数2"]
# 例如：
# RUN ["./test.php", "dev", "offline"] 等价于 RUN ./test.php dev offline
```

exec 模式不会通过shell执行相关命令

`CMD` 指令的格式和 `RUN` 相似，也是包含shell和exec两种格式，它的作用是规定：启动容器时运行指定的命令，如果容器命令后是否有其他参数，`CMD`命令则被忽略

`ENTRYPOINT` 的目的和 `CMD` 一样，都是在指定容器启动程序及参数。`ENTRYPOINT` 在运行时也可以替代，不过比 `CMD` 要略显繁琐，需要通过 `docker run` 的参数 `--entrypoint` 来指定。

优势点一：

`ENTRYPOINT [ "curl", "-s", "[http://myip.ipip.net](http://myip.ipip.net/)" ]`

可以通过如下命令添加-i 参数添加到curl命令中加以执行： `docker run myip -i`

与 `CMD` 不同的是，不管 docker run … 后是否运行有其他命令，`ENTRYPOINT` 指令后的命令一定会被执行。

`COPY` 指令将从构建上下文目录中 `<源路径>` 的文件/目录复制到新的一层的镜像内的 `<目标路径>` 位置。

`COPY [--chown=<user>:<group>] <源路径>... <目标路径>`

`ADD` 指令和 `COPY` 的格式和性质基本一致。但是在 `COPY` 基础上增加了一些功能。例如源路径可以是URL，也可以是一个tar压缩文件（add指令将会自动解压缩）

`env` 设置环境变量，既然是进程，那么在启动容器的时候，需要指定所运行的程序及参数。

```docker
ENV VERSION=1.0 DEBUG=on \
NAME="Happy Feet"
```

`ARG` 构建参数和 `ENV` 的效果一样，都是设置环境变量。所不同的是，`ARG` 所设置的构建环境的环境变量，在将来容器运行时是不会存在这些环境变量的。

tips：如果在FROM指令前使用ARG，那么只有FROM指令中才能使用ARG定义的环境变量。如果要在其他地方使用，则需要重新定义

定义匿名卷？？

`EXPOSE` 指令是声明容器运行时提供服务的端口，这只是一个声明，在容器运行时并不会因为这个声明应用就会开启这个端口的服务。如果后面调用默认端口，则会顶上

使用 `WORKDIR` 指令可以来指定工作目录（或者称为当前目录），以后各层的当前目录就被改为指定的目录，如该目录不存在，`WORKDIR` 会帮你建立目录。

格式：`WORKDIR <工作目录路径>`

`USER` 指令和 `WORKDIR` 相似，都是改变环境状态并影响以后的层。`WORKDIR` 是改变工作目录，`USER` 则是改变之后层的执行 `RUN`, `CMD` 以及 `ENTRYPOINT` 这类命令的身份。

格式：`USER <用户名>[:<用户组>]`

`HEALTHCHECK` 指令是告诉 Docker 应该如何进行判断容器的状态是否正常

当在一个镜像指定了 `HEALTHCHECK` 指令后，用其启动容器，初始状态会为 starting，在 `HEALTHCHECK` 指令检查成功后变为 healthy，如果连续一定次数失败，则会变为 unhealthy。

 例如：`HEALTHCHECK --interval=5s --timeout=3s CMD curl -fs http://localhost/ || exit 1`

`ONBUILD` 是一个特殊的指令，它后面跟的是其它指令，比如 `RUN`, `COPY` 等，而这些指令，在当前镜像构建时并不会被执行。只有当以当前镜像为基础镜像，去构建下一级镜像的时候才会被执行。

### 多阶段构建

在多阶段构建下，你可以在Dockerfile中使用多个`FROM`声明，每个`FROM`声明可以使用不同的基础镜像， 并且每个`FROM`都使用一个新的构建阶段。默认情况下，构建阶段没有命名，使用它们的整数编号引用它们，从第一个`FORM`以0开始计数。 但是也可以使用给`FORM`指令添加一个`as <NAME>`为其构建阶段命名。

![Untitled](Docker%20ed4e1c4cbd514622956161eaec8efaf5/Untitled%203.png)

## 容器

镜像（Image）和容器（Container）的关系，就像是面向对象程序设计中的 类 和 实例 一样，镜像是静态的定义，容器是镜像运行时的实体，容器依照镜像来创建。

### 新建并启动容器

`$ docker run ubuntu:18.04 /bin/echo 'Hello world'`

ubuntu:18.04 是即将运行镜像的代号
`/bin/echo 'Hello world'` 生成容器后在命令行运行该命令

```docker
$ docker run -t -i ubuntu:18.04 /bin/bash      启动一个交互式的终端
root@af8bae53bdd3:/#
```

`-t` 选项让Docker分配一个伪终端（pseudo-tty）并绑定到容器的标准输入上

`-i` 则让容器的标准输入保持打开。

也可以利用 `docker [container] start` 命令，直接将一个已经终止（exited）的容器启动运行。

`-d` 参数：让 Docker 在后台运行而不是直接把执行命令的结果输出在当前宿主机下。

`$ docker container logs [container ID or NAMES]` 获取容器的输出信息

 `$ docker container stop` 来终止一个运行中的容器。用户通过 `exit` 命令或 `Ctrl+d` 来退出终端时，所创建的容器立刻终止。

`$ docker container restart`

### 进入容器

attach命令

```docker
$ docker attach [container]
root@243c32535da7:/#             如果从该stdin中exit，会导致容器停止
```

exec命令

```docker
$ docker exec -it 69d1 bash      -it 的作用在前面介绍过  
root@69d137adef7a:/#             如果从这个 stdin 中 exit，不会导致容器的停止。
```

### 导入和导出容器

`$ docker export [container] > ubuntu.tar`     导出容器

`$ cat ubuntu.tar | docker import - test/ubuntu:v1.0`  从容器快照文件中再导入为镜像

tips：’ | ‘ 标识符用来将一段命令的输出当作输入送给 ’ | ‘ 后面的命令

### 删除容器

`$ docker container rm [container]`    来删除一个处于终止状态的容器。

如果要删除一个运行中的容器，可以添加 `-f` 参数。Docker 会发送 `SIGKILL` 信号给容器

## 数据管理

### 数据卷

`数据卷` 是一个可供一个或多个容器使用的特殊目录，可以在容器之间共享和重用，默认会一直存在，即使容器被删除。

`$ docker volume create my-vol`        创建一个数据卷

`$ docker volume ls`         查看所有的数据卷

`$ docker run -d -P --name web (-v my-vol:/usr/share/nginx/html) --mount source=my- \ vol,target=/usr/share/nginx/html nginx:alpine`

在用 `docker run` 命令的时候，使用 `--mount` 标记来将 `数据卷` 挂载到容器里。

`$ docker volume rm my-vol`       删除数据卷

### 挂载主机目录

使用 `--mount` 标记可以指定挂载一个本地主机的目录到容器中去。

`--mount type=bind,source=/src/webapp,target=/usr/share/nginx/html`

上面的命令加载主机的 `/src/webapp` 目录到容器的 `/usr/share/nginx/html`目录。

可以简单理解为，这两个目录共享一个文件资源，在两边的操作会互相影响。默认的权限为读写，也可也通过增加readonly来指定为只读。

## 使用网络

### 分配端口

`$ docker run -d -p 127.0.0.1:32768:80 nginx:alpine`

使用 `ip::containerPort` 绑定 localhost 的32768端口到容器的 80 端口，本地主机会自动分配一个端口。

### 配置内部网络

### 配置DNS
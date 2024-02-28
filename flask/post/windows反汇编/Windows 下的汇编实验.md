# Windows 下的汇编实验

posted: 2024-01-03
updated: 2024-01-03

因为现在64位的的windows中不会自带debug.exe中，所以直接在cmd激活debug是不可行，需要额外下载软件

### 安装：

1.首先要给电脑配置debug文件，因为系统默认下没有debug相关文件

链接： https://files.cnblogs.com/files/ECJTUACM-873284962/DEBUG.zip

2.下载dosbox

去官网下载DosBox软件，DosBox是一种模拟器软件，模拟 MS-DOS系统，可以运行那些在现代计算机上不能运行的MS-DOS软件

3.在额外的黑色控制台窗口中给出了config file的具体位置：

![Untitled](Windows%20%E4%B8%8B%E7%9A%84%E6%B1%87%E7%BC%96%E5%AE%9E%E9%AA%8C%207fafe84cb6c24c2fbf38909549a8bea2/Untitled.png)

![Untitled](Windows%20%E4%B8%8B%E7%9A%84%E6%B1%87%E7%BC%96%E5%AE%9E%E9%AA%8C%207fafe84cb6c24c2fbf38909549a8bea2/Untitled%201.png)

在 autoexec节下加入 

```nasm
mount C [步骤一中debug文件夹放置的路径]
C:
```

mount 指令有点像软连接，把C与后面的路径绑定，调用C的时候，其实就是进入debug文件夹

### 基础指令：

`R` 命令：列出寄存器中存在的内容

![Untitled](Windows%20%E4%B8%8B%E7%9A%84%E6%B1%87%E7%BC%96%E5%AE%9E%E9%AA%8C%207fafe84cb6c24c2fbf38909549a8bea2/Untitled%202.png)

cpu当前指向的地址 CS:IP 中，包含的机器码是0000，指令含义是 `ADD [BX+SI],AL` 

也可以使用 `r 寄存器名` 来修改寄存器的值

![Untitled](Windows%20%E4%B8%8B%E7%9A%84%E6%B1%87%E7%BC%96%E5%AE%9E%E9%AA%8C%207fafe84cb6c24c2fbf38909549a8bea2/Untitled%203.png)

`D` 命令：查看具体内存地址中的内容

![Untitled](Windows%20%E4%B8%8B%E7%9A%84%E6%B1%87%E7%BC%96%E5%AE%9E%E9%AA%8C%207fafe84cb6c24c2fbf38909549a8bea2/Untitled%204.png)

从地址0500：0之后查看128个字节，右侧为机器码的ASCII码表示

使用D命令查看具体地址的内容时，段地址信息会被传入DS寄存器，然后从DS寄存器中进行读取

`E`命令：修改具体内存地址中的内容

![Untitled](Windows%20%E4%B8%8B%E7%9A%84%E6%B1%87%E7%BC%96%E5%AE%9E%E9%AA%8C%207fafe84cb6c24c2fbf38909549a8bea2/Untitled%205.png)

`U`命令：显示机器码所代表的指令

![Untitled](Windows%20%E4%B8%8B%E7%9A%84%E6%B1%87%E7%BC%96%E5%AE%9E%E9%AA%8C%207fafe84cb6c24c2fbf38909549a8bea2/Untitled%206.png)

`T`命令：执行单条此刻CS:IP地址对应的指令，执行完后IP地址会自动叠加

`A`命令：以汇编的形式向内存中写入指令

`Q`命令：退出debug模式

debug 中的是哪个线程，为什么内存中的变量都不改变        **存疑**

为什么75页的实验结果不一致

### 运行程序

大致的流程为：

源代码 → .asm → 编译 → .obj → 连接 → .exe → 加载进内存 → 运行 

1. 源程序：

```nasm
assume cs:codesg     假设某一段寄存器和程序中的某一个segment ... ends 相关联

		codesg segment   定义一个段，段名为 codesg

		mov ax,0123H
		mov bx,0456H
		add ax,bx
		add ax,ax

		mov ax,4c00H      （程序返回，传入中断码）
		int 21H            要用p命令执行

codesg ends          定义一个段的结束

end
```

tips: 在源程序中，[0] 这种形式的偏移地址是无法使用的，可以使用如下形式

```nasm
mov bx ，0
mov al, [bx]
```

或者

```nasm
mov bx，ds:[0]
```

源文件保存为 ‘.asm’ 文件

1. 编译： 运行 masm.exe ， 依次编译生成 .obj 文件， 简便方式：`dos:> masm file.asm`
2. 链接： 运行 link.exe, 生成可执行 .exe 文件  
3. 运行

### Dos 系统中内存开辟过程

1.寻找一段起始地址为SA，偏移地址为0的空闲存区

2.这个内存区段的前256个字节被保留，dos要利用PSP来和被加载程序进行通信

3.在 SA+10H:0 之后存放代码（SA:0 到 SA+10H:0 为256字节保留地址) 

4.DS指向SA， CS指向 SA+10H

### Debug中标志寄存器的表示

![Untitled](Windows%20%E4%B8%8B%E7%9A%84%E6%B1%87%E7%BC%96%E5%AE%9E%E9%AA%8C%207fafe84cb6c24c2fbf38909549a8bea2/Untitled%207.png)
# 每天一道leetcode

### 2023-11-27 周一

## 45.跳跃游戏 II

link: [https://leetcode.cn/problems/jump-game-ii/description/?envType=study-plan-v2&envId=top-interview-150](https://leetcode.cn/problems/jump-game-ii/description/?envType=study-plan-v2&envId=top-interview-150)

题目：`给定一个长度为 n 的 **0 索引**整数数组 nums。初始位置为 nums[0]。每个元素 nums[i] 表示从索引 i 向前跳转的最大长度。换句话说，如果你在 nums[i] 处，你可以跳转到任意 nums[i + j] 处，返回到达 nums[n - 1] 的最小跳跃次数。生成的测试用例可以到达 nums[n - 1]。`

`0 <= j <= nums[i]`

`i + j < n`

### 动态规划

最先想到的做一个一维数组的动态规划，第 i 位的dp值通过遍历后面  i + nums[i] 元素中最小的值来获得  ：mini=min(mini,sto[i+j+1])，但是时间和空间复杂度都很高

最大值表示：sys.maxsize

完整代码：

```python
def jump(self, nums: List[int]) -> int:
  if len(nums)==1:
      return 0
  sto=[0 for _ in range(len(nums))]
  for i in range(len(nums)-2,-1,-1):
      mini=1000000
      for j in range(nums[i]):
          if i+j+1<len(nums):
              mini=min(mini,sto[i+j+1])
      sto[i]=mini+1
  return sto[0]
```

### 贪心

因为是跳转到任意的 i 到 nums[i]+i 内，所以可以用贪心算法，找到每次离目标点最远的坐标，

```python
def jump(self, nums: List[int]) -> int:
	position = len(nums)- 1
  int steps = 0
  while (position > 0) {
  for i in range(position):
    if (i + nums[i] >= position): 
      position = i
      steps+=1
      break
  return steps
```

正向检索

### 2023-12-8 周五

## 1544.整理字符串

links：[https://leetcode.cn/problems/make-the-string-great/description/](https://leetcode.cn/problems/make-the-string-great/description/)

题目 ：给你一个由大小写英文字母组成的字符串 `s` 。

一个整理好的字符串中，两个相邻字符 `s[i]` 和 `s[i+1]`，其中 `0<= i <= s.length-2` ，要满足如下条件:

- 若 `s[i]` 是小写字符，则 `s[i+1]` 不可以是相同的大写字符。
- 若 `s[i]` 是大写字符，则 `s[i+1]` 不可以是相同的小写字符。

请你将字符串整理好，每次你都可以从字符串中选出满足上述条件的 **两个相邻** 字符并删除，直到字符串整理好为止。请返回整理好的 **字符串** 。题目保证在给出的约束条件下，测试样例对应的答案是唯一的。

### 思路：

对于检索字符串题目，并且前一个字符与后一个字符强相关，很自然的想到栈的应用，若满足条件则入栈，不满足则不入栈，并连同前一个字符出栈，直到遍历到结尾。 

还有一个考点是对python的字符串大小写的操作是否熟悉：

### 检查大小写：

1. **`isupper()`**: 检查字符串中的所有字符是否都是大写字母。如果是，则返回**`True`**；否则返回**`False`**。
2. **`islower()`**: 检查字符串中的所有字符是否都是小写字母。如果是，则返回**`True`**；否则返回**`False`**。
3. **`istitle()`**: 检查字符串是否符合标题格式，即每个单词的首字母大写，其余字母小写。如果是，则返回**`True`**；否则返回**`False`**。
4. **`isalpha()`**: 检查字符串中的所有字符是否都是字母。这个方法可以用来确定一个字符串是否只包含字母，但不区分大小写。

### 转换大小写

1. **`upper()`**: 将字符串中的所有字符转换为大写。
2. **`lower()`**: 将字符串中的所有字符转换为小写。
3. **`capitalize()`**: 将字符串的第一个字符转换为大写，其余字符转换为小写。
4. **`title()`**: 将字符串中每个单词的首字母转换为大写，其余字母转换为小写。
5. **`swapcase()`**: 将字符串中的小写字母转换为大写，大写字母转换为小写。

### 栈：

```python
class Solution:
	def makeGood(self, s: str) -> str:
		ret = list()
		for ch in s:
		if ret and ret[-1].lower() == ch.lower() and ret[-1] != ch:
		ret.pop()
		else:
		ret.append(ch)
		return "".join(ret)
```

### 2023-12-11 周一

## 42.接雨水

link：[https://leetcode.cn/problems/trapping-rain-water/?envType=study-plan-v2&envId=top-interview-150](https://leetcode.cn/problems/trapping-rain-water/?envType=study-plan-v2&envId=top-interview-150)

![Untitled](%E6%AF%8F%E5%A4%A9%E4%B8%80%E9%81%93leetcode%2027864d3e614d42d5bfc8105abe9073ea/Untitled.png)

对于这种矩形柱状图的题目，最通用的方法是单调栈，对于这道题而言，如果指针left对应的柱子高度小于前者，则将left入栈，如果大于则计算积水面积

```python
def trap(self, height: List[int]) -> int:
        stack=[]
        n=len(height)
        res=0
        left=0
        while left<n:
            while stack and height[left]>=height[stack[-1]]:
                temp=stack.pop()
                if stack:
                    res+=(min(height[left],height[stack[-1]])-height[temp])*(left-stack[-1]-1)
            # res+=height[stack[-1]]*(left-stack[-1]-1)
            stack.append(left)
            left+=1
        return res
```

### 2023-12-12 周二

## 13.罗马数字转整数

link：[https://leetcode.cn/problems/roman-to-integer/description/?envType=study-plan-v2&envId=top-interview-150](https://leetcode.cn/problems/roman-to-integer/description/?envType=study-plan-v2&envId=top-interview-150)

![Untitled](%E6%AF%8F%E5%A4%A9%E4%B8%80%E9%81%93leetcode%2027864d3e614d42d5bfc8105abe9073ea/Untitled%201.png)

字符串的查找：s.find(substring,start_index,end_index) 如果找到则返回找到的索引位置，没找到则返回-1

字符串的替换删除 temp=s.replace(’   ‘ , target_string)

若前一个字符小于后一个字符，则将前一个字符取反。

熟悉 SYMBOL_VALUES的这种写法

```python

class Solution:
	SYMBOL_VALUES = {
	    'I': 1,
	    'V': 5,
	    'X': 10,
	    'L': 50,
	    'C': 100,
	    'D': 500,
	    'M': 1000,
	}
	
	def romanToInt(self, s: str) -> int:
	    ans = 0
	    n = len(s)
	    for i, ch in enumerate(s):
	        value = Solution.SYMBOL_VALUES[ch]
	        if i < n - 1 and value < Solution.SYMBOL_VALUES[s[i + 1]]:
	            ans -= value
	        else:
	            ans += value
	    return ans
```

### 2023-12-13 周三

## 12.整数转罗马数字

罗马数字都可以看作是数字从大到小依次排列，所以列出一个从大到小的字典表，依次匹配

![Untitled](%E6%AF%8F%E5%A4%A9%E4%B8%80%E9%81%93leetcode%2027864d3e614d42d5bfc8105abe9073ea/Untitled%202.png)

```python

class Solution:
VALUE_SYMBOLS = [
    (1000, "M"),
    (900, "CM"),
    (500, "D"),
    (400, "CD"),
    (100, "C"),
    (90, "XC"),
    (50, "L"),
    (40, "XL"),
    (10, "X"),
    (9, "IX"),
    (5, "V"),
    (4, "IV"),
    (1, "I"),
]

def intToRoman(self, num: int) -> str:
    roman = list()
    for value, symbol in Solution.VALUE_SYMBOLS:
        while num >= value:
            num -= value
            roman.append(symbol)
        if num == 0:
            break
    return "".join(roman)

```

傻逼原版：逐位匹配

```python
class Solution:
    def intToRoman(self, num: int) -> str:
        roma_dict={1:{1:'I',2:'V'},
2:{1:'X',2:'L'},
3:{1:'C',2:'D'},
4:{1:'M'}
        }
        four_dict={1:{0:'IV',1:'IX'},
2:{0:'XL',1:'XC'},
3:{0:'CD',1:'CM'}
        }
        sto=[]
        ratio=0
        res=num
        while res>=1:
            res_temp=''
            ratio+=1
            temp=floor(res%10)
            res=floor(res/10)
            while temp>0:
                level=floor(temp/5)
                if temp%5==4:
                    print(ratio)
                    print(level)
                    sto.append(four_dict[ratio][level])
                    break
                else:
                    if level==0:
                        temp-=1
                    else:
                        temp-=5
                    res_temp+=roma_dict[ratio][level+1]
            print(sto)
            sto.append(res_temp)
        
        sto.reverse()
        return "".join(sto)
```

### 2023-12-14 周四

今天的题目都比较简单基础

## 58.最后一个单词的长度

给你一个字符串 `s`，由若干单词组成，单词前后用一些空格字符隔开。返回字符串中 **最后一个** 单词的长度。**单词** 是指仅由字母组成、不包含任何空格字符的最大子字符串。

```python
class Solution:
    def lengthOfLastWord(self, s: str) -> int:
        return len(s.strip().split(' ')[-1])
```

## 14.最长公共前缀

编写一个函数来查找字符串数组中的最长公共前缀。如果不存在公共前缀，返回空字符串 `""`。

纵向搜索

```python
class Solution:
    def longestCommonPrefix(self, strs: List[str]) -> str:
        res=""
        for i in range(len(strs[0])):
            for j in range(1,len(strs)):
                if i>=len(strs[j]) or strs[0][i]!=strs[j][i]:
                    return res
            res+=strs[0][i]
        return res
```

### 2023-12-15 周五

今天也是两道非常简单的关于字符串的题目

## 151.反转字符串中的单词

给你一个字符串 `s` ，请你反转字符串中 **单词** 的顺序。**单词** 是由非空格字符组成的字符串。`s` 中使用至少一个空格将字符串中的 **单词** 分隔开。返回 **单词** 顺序颠倒且 **单词** 之间用单个空格连接的结果字符串。

tips：

list.reverse() 是对序列的原地操作，返回的是一个None对象

reversed(list) 返回的是把list反转后的迭代器，不是原地操作

```python
class Solution:
    def reverseWords(self, s: str) -> str:
            sto=s.split(" ")
            sto.reverse()
            res=''
            for i in range(len(sto)):
                if sto[i]!='':
                    res=res+" "+sto[i]
            return res.strip()
```

## 28.找出字符串中第一个匹配项的下标

给你两个字符串 `haystack` 和 `needle` ，请你在 `haystack` 字符串中找出 `needle` 字符串的第一个匹配项的下标（下标从 0 开始）。如果 `needle` 不是 `haystack` 的一部分，则返回  `-1` ****。

```python
class Solution:
    def strStr(self, haystack: str, needle: str) -> int:
        cnt=0
        left=0
        while left<len(haystack):
            temp=left
            while 1:
                if  temp>=len(haystack) or haystack[temp] != needle[cnt]:
                    break
                else:
                    temp+=1
                    cnt+=1
                    if cnt==len(needle):
                        return left
            left+=1
            cnt=0
        return -1
        # return haystack.find(needle)
```
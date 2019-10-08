1.选择器
  id选择器：#
  类选择器：.container
  属性选择器: [title] 
  标签选择器: p
  伪类选择器：:active
  伪元素选择器：::before

  后代选择器：空格
  相邻后代选择器：>
  兄弟选择器： ～
  相邻兄弟选择器：+


1.伪类和伪元素
  伪类其实是弥补了CSS选择器的不足，用来更方便地获取信息；使用:号；
    eg: :first-child :last-child  :first-of-type  :last-of-type
  伪元素本质上是添加虚拟容器(元素)，可以添加内容和样式；使用::号；
    eg: ::before  ::after   ::first-letter  ::first-line (匹配元素中第一行的文本(只能在块元素中使用))
        ::selection (匹配被用户选中的部分)


无宽度，无图片，无浮动

css3
 min-content
 max-content
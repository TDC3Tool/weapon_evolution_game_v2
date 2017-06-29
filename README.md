### 第一问

* 对打游戏
* 有两个人，下称玩家
* 每个人都有血值
* 有攻击力
* 没有防御力
* 有名字
* 可以互相对打
* 游戏开始，双方互殴，你一下我一下，直到一人死亡，打印出xx被打败了。
* 只需要写核心逻辑，不需要考虑界面。

输出
```javascript
李四被打败了.
```

### 第二问

* 每次攻击输出谁攻击了谁，被攻击的人掉了多少血，剩多少血。

输出
```javascript
张三攻击了李四,李四受到了8点伤害,李四剩余生命：12
李四攻击了张三,张三受到了9点伤害,张三剩余生命：1
张三攻击了李四,李四受到了8点伤害,李四剩余生命：4
李四攻击了张三,张三受到了9点伤害,张三剩余生命：-8
张三被打败了
```

### 第三问

* 要有职业分为： 普通人和战士。
* 攻击要输出职业+名字
* 被攻击时也输出
* 战士可以装备武器，武器有名字。所以要输出用武器攻击了对方。
* 武器有额外的攻击力。
* 战士和普通人可以互相攻击。
* 战士可以装备防具
* 普通人不可以装备防具或武器
* 战士受到的伤害是对方的攻击力减去防御力.
* 第二问的单行输出需求被废弃。

(下列输出没有包含防具,但是记得要实现防具的防御功能，下列输出只是例子，不见得做题时要写的完全一样)

输出1:
```javascript
战士张三用优质木棒攻击了普通人李四,李四受到了8点伤害,李四剩余生命：12
```
输出2：
```javascript
普通人李四攻击了战士张三,张三受到了9点伤害,张三剩余生命：1
```

输出3：
```javascript
普通人张三攻击了普通人李四,李四受到了8点伤害,李四剩余生命：4
```
==教学说明==

要求设计出Solider和Player两个类，体现继承，消除重复。 这个题目最大的练习点在于最小知识原则，又称迪米特法则。尤其到了第四问，很重要。

### 第四问 第一部分

* 武器有特性，产生各种效果：
* 毒性伤害，每轮损血，属于延时伤害
* 火焰伤害，每轮损血，属于延时伤害
* 冰冻伤害，每两轮无法攻击一轮，属于延时伤害
* 击晕伤害，两轮无法攻击，属于延时伤害
* 全力一击，三倍伤害，是伤害乘以3，不是攻击力。
* 有的武器有特性，有的武器没有，一个武器只有一个特性

* 效果触发是随机的。不同的武器有不同的触发几率。

* 发动时要打印受了xx伤害
* 延时伤害结算在每局受到延时伤害的人攻击前，发动时打印伤害。
* 延时伤害都有伤害效果发动的次数，不同的武器造成的伤害发动的次数不同，次数归零就不再伤害，状态也会消失。除了眩晕伤害之外，其他的不显示还剩几轮。
* 每种延时伤害都可以跟自己累加，一个人中了两次同一种延时伤害，其效果会累加。冰冻或眩晕各自累加的是发动次数，毒性或火焰各自累加的是伤害值和发动次数。
* 第三问的需求依然有效。
例子：（注：下面的//只是示意，实际要求跟正常的攻击输出一样。）

输出1（毒性）:
```javascript
战士张三用优质毒剑攻击了普通人李四,李四受到了8点伤害,李四中毒了,李四剩余生命：12
李四受到2点毒性伤害, 李四剩余生命：10
//李四进攻
//张三进攻
李四受到2点毒性伤害, 李四剩余生命：x
//李四进攻
```
输出2（冰冻）：
```javascript
战士张三用火焰剑攻击了普通人李四,李四受到了8点伤害,李四着火了,李四剩余生命：12
李四受到2点火焰伤害, 李四剩余生命：10
//李四进攻
//张三进攻
李四受到2点火焰伤害, 李四剩余生命：x
//李四进攻
```

输出3（冰冻）：
```javascript
战士张三用寒冰剑攻击了普通人李四,李四受到了8点伤害,李四冻僵了,李四剩余生命：12
//李四进攻
//张三进攻
//李四进攻
//张三进攻
李四冻得直哆嗦，没有击中张三
//张三进攻
```

输出4（眩晕）：
```javascript
战士张三用晕锤攻击了普通人李四,李四受到了8点伤害,李四晕倒了,李四剩余生命：12
李四晕倒了，无法攻击, 眩晕还剩：1轮
//张三进攻
李四晕倒了，无法攻击, 眩晕还剩：0轮
//张三进攻
//李四进攻
```

输出5（全力）：
```javascript
战士张三用利剑攻击了普通人李四,张三发动了全力一击,李四受到了24点伤害,李四剩余生命：-4
```

输出6（累加）：
```javascript
战士张三用晕锤攻击了普通人李四,李四受到了8点伤害,李四晕倒了,李四剩余生命：12
李四晕倒了，无法攻击, 眩晕还剩：1轮
战士张三用晕锤攻击了普通人李四,李四受到了8点伤害,李四晕倒了,李四剩余生命：4
李四晕倒了，无法攻击, 眩晕还剩：2轮
//张三进攻
李四晕倒了，无法攻击, 眩晕还剩：1轮
//张三进攻
李四晕倒了，无法攻击, 眩晕还剩：0轮
//张三进攻
//李四进攻  
```

### 第四问 第二部分
* 有的武器有多种特性，但是每次只触发一种伤害，当有多种伤害的时候，以第一个触发的为本次触发伤害。多种特性可以是相同种类的也可以是不同种类的。每个特性触发伤害效果的几率，伤害和发动次数一般不同。比如武器超级火焰剑，拥有两个火焰特性，第一个火焰特性触发效果的几率是0.2，伤害为2，发动次数为3，第二个火焰特性的触发几率是0.3，伤害为5，发动次数为2。不同的与上例类似。
* 每种延时伤害不能跟其他延时伤害累加。一个人同一时间只能处于一个延时伤害状态，获得一种延时伤害，另一种延时伤害就会消失。但是非延时伤害不会取消延时伤害，例如全力一击因为没有延时伤害，所以不会取消另一种伤害。


### 第五问

* 武器再分化为长中短
* 职业再分化为
* 刺客，战士，骑士
* 这三个职业都可以装备防具

* 刺客只可以装备中短武器

* 战士只可以装备中武器
* 骑士只可以装备中长武器
* 如果装备了不可以装备的武器，那么会抛出异常

* 长中短武器有各自的职业技能效果

* 只有刺客可以发动短武器技能效果
* 只有战士可以发动中武器技能效果
* 只有骑士可以发动长武器技能效果

* 引入攻击距离与靠近概念,平时双方默认的距离为1

* 普通武器的攻击距离是1,长兵器的攻击距离为2
* 长武器有击退效果,不同的长武器击退距离不一样，但最多为2,       
  击退距离+现在的距离=击退后的距离，比如现在的距离为1，击退距离为2，则击退后的距离为3
* 被击退的人下一局要先移动至可以进行攻击的范围，称之为靠近.靠近与攻击,一局内只能发生其中之一.骑士例外,骑士在一轮中   既能靠近也能攻击,战士的一局只能移动1，而刺客和骑士一局可以移动2
* 短武器有连击效果，发动连击的人会发动两次攻击，打印两次攻击在同一行里
* 中武器有防御力,且可以隔挡反击,兵器的防御力平时不记入防御力,当发生隔挡反击的时候计算入防御力.同时完成一次额外的攻   击，如果在攻击距离之外，只隔当不反击
* 触发几率都是1／4

输出1:
```javascript
刺客张三用峨眉刺攻击了骑士李四,李四受到了8点伤害,张三发动了连击,李四收到了8点伤害,李四剩余生命: 4
```
输出2:
```javascript
刺客张三用冰雪峨眉刺攻击了骑士李四,李四受到了8点伤害,李四冻僵了,张三发动了连击,李四收到了8点伤害,李四剩余生命: 4
```
输出3:
```javascript
骑士张三用长枪攻击了刺客李四,李四受到了8点伤害,李四被击退了,李四剩余生命: 12
李四靠近了张三
//张三进攻
//李四进攻
```
输出4:
```javascript
骑士张三用长枪攻击了战士李四,李四受到了6点伤害,李四发动了隔挡反击,张三受到了9点伤害.李四剩余生命:14,张三剩余生命:11
//李四攻击

骑士张三用长枪攻击了战士李四,李四受到了6点伤害,李四发动了隔挡反击,张三不在攻击范围内.李四剩余生命:14,张三剩余生命:11
//李四攻击
```

### 第六问（选作）
* 角斗场所
* 场所会对各个属性都有影响
* 屋顶和弄堂对刺客有加成
* 战场和关隘对骑士有加成
* 庭院和都市大道对战士有加成
* 加成的方式是当触发技能效果的时候，各自收到更多的影响

* 屋顶和弄堂里,刺客会因为敏捷的动作而获得额外的一轮进攻

* 战场和关隘,骑士击退距离为武器标注的两倍
* 庭院和都市大道,战士可以隔挡后,连续进攻两次，如果对方不在攻击范围内，则会移动

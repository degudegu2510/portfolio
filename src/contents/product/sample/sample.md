---
title: sample
thumbnail: ./../public/image-ogp.png
---

## h2だよ
### h3だよ
## h2だよ
### 長いテキスト長いテキスト長いテキスト長いテキスト長いテキスト長いテキスト
#### h4
##### h5
###### h6

普通のテキスト

- リスト1
- リスト2
  - サブリスト1
    - hoge
  - サブリスト1
    - hoge

1. 番号付きリスト1
   1. 番号付きリスト1
   2. 番号付きリスト2
      1. hoge
      2. hoge
   3. 番号付きリスト3
2. 番号付きリスト2
3. 番号付きリスト3

**太字**
*斜体*
~~取り消し線~~

`インラインコード`

```
const codeBlock = "codeBlock";
```

```javascript
const n = 123; // allocates memory for a number
const s = "azerty"; // allocates memory for a string

const o = {
  a: 1,
  b: null,
}; // allocates memory for an object and contained values

// (like object) allocates memory for the array and
// contained values
const a = [1, null, "abra"];

function f(a) {
  return a + 2;
} // allocates a function (which is a callable object)

// function expressions also allocate an object
someElement.addEventListener(
  "click",
  () => {
    someElement.style.backgroundColor = "blue";
  },
  false,
);
```

[Link](/test)

> 引用1

---

- [ ] 未完了のタスク
- [x] 完了したタスク

| 見出し1 | 見出し2 |
|---------|---------|
| 内容1   | 内容2   |
| 内容3   | 内容4   |


Markdown:  軽量なマークアップ言語  
React: JavaScriptライブラリ

<span style="color: red;">赤い文字</span>
 
[^1]: 注釈です。

<details>
  <summary>クリックして詳細を見る</summary>
  詳細な説明がここに入ります。
</details>

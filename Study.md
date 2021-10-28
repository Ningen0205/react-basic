## JSX

JavaScriptの拡張言語である。

jsxは最終的にReact要素を生成する。

class名を要素に着けるときはclassNameで指定する。

キャメルケースで記述する（ex: imagePath)

{}内で変数を扱うことができる

空要素の場合は閉じタグが必要

JSXは必ず階層構造にする必要がある

要素を囲う必要がない場合は、React.Fragmentで囲う。

htmlとして出力されない。

省略して<> </>で記述することもできる。

## 環境構築

npx create-react-app <アプリ名>　で環境構築ができる

nodeなどが入っている前提。

## npm script

npm start 開発用のローカルサーバを起動する

npm run build 本番用ファイルを吐き出す

npm run eject babelやwebpackの設定を変更するために使用する。

## componentとprops

- class component
- functional component

```jsx
import React from "react"

const Button = (props) => {
	return (
		return <button>Say, {props.hello}</button>
	)
}

```

componentを使用するのか

- 再利用するため
    - 同じ記述を何回もする必要がない
- コードの見通しをよくするため
    - １ファイル＝１コンポーネント
    - 別ファイルに分ける事でコードが読みやすくなる
- 変更に強くするため
    - 修正が1箇所で完了するため。

componentの使い方

- ファイル名は先頭大文字
- 子componentでexport,  親コンポーネントでimport

```jsx
import Article from "./components/Article";

const App = () => {
	return (
		<div>
			<Article />
		</div>
	)
}

export default App;
```

```jsx
const Article = () => <h2>こんにちは</h2>

export default Article;
```

## props でデータを渡す

App.jsx

```jsx
import Article from "./components/Article";

const App = () => {
    return (
        <div>
            <Article
                title={'新・日本一分かりやすいReact入門'}
                content={'今日のトピックはpropsについて。'}
            />
        </div>
    );
};
```

Article.jsx

```jsx
const Article = (props) => {
    return (
        <div>
            <h2>{props.title}</h2>
            <p>{props.content}</p>
        </div>
    );
};

export default Article;
```


## コンポーネントのimport export

なぜcomponentを分けるのか

- 責務を明確にする
- 大規模アプリでも管理しやすくするため。
- 再利用するため

## default

default export

```jsx
const Title = (props) => {
    return <h2>{props.title</h2> 
}
```

default import

```jsx
import Title from "./comppnents/Title"
```

## 名前付きexport

index.js

```jsx
export { defalut as Title } from './Title'
```

## 名前付きimport

```jsx
import { Title } from './index'
```

## 状態管理

### なぜstateを使うのか

- Reactコンポーネントの値を買い換えたい
  - 新しい値を使って再描画させる
- Reactコンポーネントが再描画されるきっかけは
  -  stateが変更されたとき
  -  props が変更されたとき


## useStateの使い方


```jsx
// 0 で初期化
const [state, setState] = useState(0)

// 1をセットする
setState(1)
```

## propsとstateの違い

- propsは引数のようにコンポーネント内に渡される値
- stateはコンポーネントの内部で宣言・制御される値

## stateをpropsに渡す

- 更新関数はそのままpropsに渡さずに関数化してから渡す
- 関数をpropに渡す時は注意する

### 渡す際の注意点

- コールバック関数を渡すか関数自体を渡す
- 関数()で渡すと無限に再レンダリングが発生してしまい、動作しない。

## 頻出するuseStateのパターン

1. 引数を使用して更新する


```jsx
import React, { useState } from 'react';

const TextInput = () => {
    const [name, setName] = useState('');

    const handleName = (event) => {
        setName(event.target.value)
    }

    return (
        <input
            onChange={(event) => handleName}
            type={"text"}
            value={name}
        />
    )
}
```

1. prevStateを活用する

- useStateの更新関数で使用できる特赦なprevState
- prevStateは更新前のstate
- prevStateに変更を加えてreturnする

```jsx
import React, { useState } from 'react'

const counter = () => {
    const [count, setCount] = useState(0)

    const countUp = () => {
        setCount(prevState => prevState + 1)
    }

    const countDown = () => {
        setCount(prevState => prevState - 1)
    }

    return (
        <div>
          <p>現在のカウント数： {count}</p>
          <button onClick={countUp}>up</button>
          <button onClick={countDown}>down</button>
        </div>
    )
}
```

1. ON/OFFを切り変えるボタン

```jsx
import React, { useState } from 'react'

const ToggleButton = () => {
    const [open, setOpen] = useState(false)

    const toggle = () => {
        setOpen(prevState => !prevState)
    }

    return (
        <button onClick={toggle}>
            { open ? 'OPEN' : 'CLOSE' }
        </button>
    )
}
```

| 1         |   2   | 3   |
| --------- | :---: | --- |
| ddddddddd | dddd  |     |
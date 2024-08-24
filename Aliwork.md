# 宜搭

宜搭的 `this.setState` 不支持 `callback`
因此不支持

```jsx
this.setState({}, () => {
  console.log("这是 callback");
});
```

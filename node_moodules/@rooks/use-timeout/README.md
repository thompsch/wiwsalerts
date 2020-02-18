# @rooks/use-timeout

### setTimeout hook for react.
<br/>


[![Build Status](https://travis-ci.org/imbhargav5/rooks.svg?branch=master)](https://travis-ci.org/imbhargav5/rooks) ![](https://img.shields.io/npm/v/@rooks/use-timeout/latest.svg) ![](https://img.shields.io/npm/l/@rooks/use-timeout.svg) ![](https://img.shields.io/npm/dt/@rooks/use-timeout.svg) ![](https://img.shields.io/david/imbhargav5/rooks.svg?path=packages%2Ftimeout)

<a href="https://spectrum.chat/rooks"><img src="https://withspectrum.github.io/badge/badge.svg" alt="Join the community on Spectrum"/></a>

### Installation

```
npm install --save @rooks/use-timeout
```

### Importing the hook

```javascript
import useTimeout from "@rooks/use-timeout"
```


### Usage

```jsx
function TimeoutComponent() {
  function doAlert() {
    window.alert("timeout expired!");
  }
  const { start, clear } = useTimeout(doAlert, 2000);
  return (
    <>
      <button onClick={start}> Start timeout </button>
      <button onClick={clear}> Clear timeout </button>
    </>
  );
}

render(<TimeoutComponent/>)
```

### Arguments

| Arguments | Type     | Description                                              | Default value |
| --------- | -------- | -------------------------------------------------------- | ------------- |
| callback  | function | Function to be executed in timeout                       | undefind      |
| delay     | Number   | Number in milliseconds after which callback is to be run | 0             |

### Returned Object keys

| Returned object attributes | Type     | Description       |
| -------------------------- | -------- | ----------------- |
| clear                      | function | Clear the timeout |
| start                      | function | Start the timeout |


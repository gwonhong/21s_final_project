# How to Use Game Board Script?
# 주의!! countDice는 제가 임의의 리스트를 만들어서 구현한 것이기 때문에 그냥 가져다 쓰면 동작하지 않습니다!!

## Important Things
- isTurn
- whosTurn
- countDice
- drawScore

### `boolean isTurn`:
이것은 현재 점수판을 기입할 시점인지를 표시하는 변수입니다.

주사위를 굴린 후 `isTurn = true;`를 하시면 점수 판에서 특정 점수를 확정시킬 수 있습니다. 즉 `isTurn`이 `true`일 때만 클릭 리스너가 동작합니다.

### `int whosTurn` :
이것은 현재 어떤 플레이어의 턴인지를 표시하는 변수입니다. 다음과 같이 맵핑 되어있습니다.
- Player A -> whosTurn = 0
- Player B -> whosTurn = 1
- Player C -> whosTurn = 2
- Player D -> whosTurn = 3

활용 용도는 playerList 배열에서 확인하실 수 있습니다. playerNum이 4인경우:
``` js
let playerList = ["A", "B", "C", "D"];
```
위와 같은 두가지 변수가 클릭 리스너를 작동시키기 위한 중요 변수들 입니다.


``` js
blank.addEventListener("click", () => {
            if (blank.className) return;
            if (!isTurn) return;
            if (turn != playerList[whosTurn]) return;
            blank.className = "confirm";
            isTurn = false;
            console.log("Yeaaa " + tagName + " " + turn);
          })
```
### `function countDice()`:

현재 주사위의 값들을 읽어오기 위한 함수입니다. 주사위를 굴린후 계속 호출하여 주사위 값들을 업데이트 시키시면 됩니다. 정확한 용도는 ***주사위의 값을 읽어 특정 주사위 값을 가지는 주사위가 몇개 있는지 저장하는 함수입니다.*** 이 함수는 아래의 배열을 업데이트 시킵니다.
```js
let diceCounter = [0, 0, 0, 0, 0, 0, 0];
```
편의를 위해서 0번째 element는 사용하지 않습니다. ***만약 값이 1인 주사위가 2개 값이 2인 주사위가 2개 값이 5인 주사위가 1개 존재한다면*** 배열은 다음과 같은 상태를 가지게 될 것입니다.
```js
let diceCounter = [0, 2, 2, 0, 0, 1, 0];
```

### `function drawScore`:
배열 diceCounter를 기반으로 하여 점수판에 현재 주사위 조합에 따라 가능한 점수들을 보여주는 함수입니다. countDice함수를 호출하신 뒤 이 함수를 호출하시면 됩니다. 그리고 whosTurn변수가 정확히 업데이트 되어야 이 함수가 올바르게 동작합니다.

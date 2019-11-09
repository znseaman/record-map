Record all the actions on a map with the ability to undo & redo

## Inspiration

I liked playing around with the Redux DevTools and thought it would be cool to be able to move through the actions that happen on a map.

## Improvements

### Features

- Detect if the map shape was changed before dispatching `UPDATE_LAYER` action, instead of calling it each time regardless of if it has changed

### User Experience (UX)

- Add styling using emotion

### Developer Experience (DX)

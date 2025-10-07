
Here are your advanced React notes based on your specified format:

---

## 1. Higher Order Components (HOC)

### Definition
A Higher Order Component is a function that takes a component and returns a new component with enhanced behavior. It allows code reuse between components.

### Example
A HOC that adds loading functionality to any component.

### Code
```jsx
function withLoading(Component) {
  return function WithLoadingComponent({ isLoading, ...props }) {
    if (isLoading) return <p>Loading...</p>;
    return <Component {...props} />;
  };
}
```

### Diagram
```
Component A --> withLoading(Component A) --> Enhanced Component
```

### Use Case
Used for authentication checks, conditional rendering, theming, etc.

### Interview Questions
- What is an HOC in React?
- How do you use HOCs to reuse logic?

---

## 2. Reusing Components, Lists, and Keys

### Definition
React allows reusing components by passing different props. Lists are dynamic elements rendered from arrays. Keys help React identify items.

### Example
Rendering a list of users.

### Code
```jsx
function UserCard({ user }) {
  return <div>{user.name}</div>;
}

function UserList({ users }) {
  return (
    <div>
      {users.map(user => <UserCard key={user.id} user={user} />)}
    </div>
  );
}
```

### Diagram
```
Users Array --> map --> UserCard (with key)
```

### Use Case
Displaying blogs, users, products, etc.

### Interview Questions
- Why are keys important in React lists?
- Can we reuse components with different props?

---

## 3. Props Drilling

### Definition
Passing data from parent to deeply nested child components through intermediary components.

### Example
A user prop passed from App to ProfileDetails via multiple layers.

### Code
```jsx
<App>
  <Profile user={user} />
</App>

function Profile({ user }) {
  return <ProfileDetails user={user} />;
}
```

### Diagram
```
App --> Profile --> ProfileDetails
```

### Use Case
Passing auth user, theme, or settings deep into component tree.

### Interview Questions
- What is props drilling?
- How can we avoid props drilling?

---

## 4. Component Lifecycle: Mounting, Updating, Unmounting

### Definition
Every React component goes through phases:
- Mounting: inserted into the DOM
- Updating: re-render due to state/props
- Unmounting: removed from the DOM

### Example
Logging lifecycle events.

### Code
```jsx
class MyComponent extends React.Component {
  componentDidMount() {
    console.log("Mounted");
  }
  componentDidUpdate() {
    console.log("Updated");
  }
  componentWillUnmount() {
    console.log("Unmounted");
  }
  render() {
    return <div>Hello</div>;
  }
}
```

### Diagram
```
Mount --> Update(s) --> Unmount
```

### Use Case
Network requests, subscriptions, timers.

### Interview Questions
- What are React lifecycle phases?
- When is componentDidMount called?

---

## 5. React Lifecycle Methods

### componentDidMount
Called once after the component is mounted. Good for data fetching.

### componentDidUpdate
Called after re-render.

### componentWillUnmount
Used to clean up timers, listeners.

### Interview Questions
- What are class lifecycle methods?
- Which lifecycle is used for API calls?

---

## 6. React Hooks

### What are Hooks?
Hooks let you use state and lifecycle features in functional components.

### Why Hooks?
- Avoid class components
- Reuse logic via custom hooks

---

## 7. Rules of Hooks

### Rules
- Only call hooks at the top level (not inside loops/conditions).
- Only call hooks in React functions (components or custom hooks).

### Interview Questions
- What are the rules of using React hooks?
- Why can’t hooks be called conditionally?

---

## 8. Commonly Used Hooks

### useState
Manages component state.
```jsx
const [count, setCount] = useState(0);
```

### useEffect
Runs side effects like data fetching or subscriptions.
```jsx
useEffect(() => {
  fetchData();
}, []);
```

### useContext
Access context value.
```jsx
const value = useContext(MyContext);
```

### useRef
Stores mutable values that do not cause re-render on change.
```jsx
const inputRef = useRef();
```

### useCallback
Returns a memoized version of a callback.
```jsx
const memoizedCallback = useCallback(() => doSomething(), [deps]);
```

### useMemo
Returns a memoized value.
```jsx
const memoizedValue = useMemo(() => computeExpensiveValue(a, b), [a, b]);
```

---

## 9. Custom Hooks

### When to Create
When you find repeated logic across components (e.g. form handling, counters, data fetching).

### How to Create
Write a function that uses other hooks and return necessary values.

### Example
```jsx
function useCounter(initial = 0) {
  const [count, setCount] = useState(initial);
  const increment = () => setCount(c => c + 1);
  return { count, increment };
}
```

### Use Case
- Form validation logic
- API polling
- Toggle states

### Interview Questions
- When should you use custom hooks?
- What is the benefit of creating a custom hook?

---

## 10. Context API

### Definition
A way to share data globally without passing props through every level.

### Code
```jsx
const UserContext = React.createContext();

function App() {
  return (
    <UserContext.Provider value={{ name: "Alice" }}>
      <Profile />
    </UserContext.Provider>
  );
}

function Profile() {
  const user = useContext(UserContext);
  return <div>{user.name}</div>;
}
```

### Diagram
```
UserContext.Provider
    └── Profile
         └── useContext(UserContext)
```

### Use Case
Auth, theme, language switcher, global state.

### Interview Questions
- What problem does Context API solve?
- How do you use useContext?

---

## 11. Redux and State Management

### What is Redux?
Redux is a predictable state container for JavaScript apps, often used with React to manage application-level state.

### When and Why Use Redux?
- Use when you have complex state shared across multiple components.
- Helpful for debugging, testing, and time-travel debugging.

### Principles of Redux
- **Single Source of Truth**: One state tree.
- **State is Read-Only**: Only way to change state is via actions.
- **Changes via Pure Functions**: Reducers are pure.

### Redux Flow
```
Component -> dispatch(Action) -> Reducer -> Store -> Component (via connect or hooks)
```

### Why Use State Management Libraries?
- Avoid prop drilling
- Centralize logic
- Easier to debug and maintain

### Pure Functions in Reducers
Reducers must be pure so they produce the same output given the same input. No side-effects allowed.

### Redux Basics
- **Actions**: Plain objects describing what happened
- **Reducers**: Pure functions returning new state
- **Store**: Holds the entire state
- **Middleware**: Intercept actions (e.g., redux-thunk)
- **Thunk**: Lets you return functions for async actions

### Example Redux Flow
```js
const INCREMENT = 'INCREMENT';
const increment = () => ({ type: INCREMENT });

function counterReducer(state = { count: 0 }, action) {
  switch (action.type) {
    case INCREMENT:
      return { count: state.count + 1 };
    default:
      return state;
  }
}
```

### React-Redux
Connect Redux to React using `react-redux`:
```jsx
import { useSelector, useDispatch } from 'react-redux';
const count = useSelector(state => state.count);
const dispatch = useDispatch();
dispatch(increment());
```

### Redux Toolkit
Modern, simplified approach to Redux:
- Built-in `createSlice`, `configureStore`, `createAsyncThunk`
- Reduces boilerplate

### Alternatives
- **Recoil**: State management with atom-based granularity
- **Zustand**: Minimalist, hooks-based store
- **MobX**: Observable state and reactive programming

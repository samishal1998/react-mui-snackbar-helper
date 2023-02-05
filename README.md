# MUI Snackbar Helper
This library allows you to use Snackbar (from [mui](https://mui.com))imperatively and easily accros components.
Imagine you ahve a web app with +20 pages, then you have to setup the snackbar component in each one and add multiple states to manage the opening/closing, position, message, title ... of the snackbar, or use a state with an object conatining all the props for the snackbar, not to mention pasing down callbacks to subcomponents to show the snackbar upon an action.
So I created this library to simplify all this using Context API and Hooks, and you simply can control the snackbar imepartively from any component.

## Installation

```bash
npm install react-mui-snackbar-helper
```

## Setup
The Library exports `SnackbarProvider`, you can wrap the app with the provider then you can use it from any page or any component. alternatively you can wrap a certain portion only, for example; a certain route or subpage.

```jsx
root.render(

    <React.StrictMode>
        <SnackbarProvider>
          <App />
        </SnackbarProvider>
    </React.StrictMode>

);
```
## Usage

### Hooks

- You can use the `useSnackbar` Hook, it returns the following:

```js
const {
 // helper methods start
    showMessage,
    showErrorMessage,
    showSuccessMessage,
    showWarningMessage,
    showInfoMessage,
 // helper methods end
 
    snackbarRef //ref to the AlertSnackbar component
} = useSnackbar();

```
- you can use the helper methods as follows:

```js
/**
 *	@param message:React.ReactNode
 *. @param title:React.ReactNode
 *  @param timeout:number @default(5000)  im millisecond
 */
showSuccessMessage("This is a success Message", "Success Title",2000)
showWarningMessage("This is a warning Message", "Warning Title",3000)
showInfoMessage("This is a info Message", "Info Title")
showErrorMessage("This is a error Message", "Error Title")
```


- Alternatively, if you want to show message with severity from a variable you can use the `showMessage` helper method that takes severity as the first argument instead of using switch case with the explicit helper methods.

```js
/**
 *	@param severity:AlertColor
 *	@param message:React.ReactNode
 *. @param title:React.ReactNode
 *  @param timeout:number @default(5000)  im millisecond
 */
showMessage("success","This is a success Message", "Success Title",2000)
showMessage("warning","This is a warning Message", "Warning Title",3000)
showMessage("info","This is a info Message", "Info Title")
showMessage("error","This is a error Message", "Error Title")
```



#### Using The Ref

```javascript
snackbarRef.current?.setAlertData(
    {
        severity: 'success',
        message: "This is a success Message",
        timeout: 3000,
        title: "Success Title",
    }
)
snackbarRef.current?.open()
```

### HOCs

The library also export `SnackbarConsumer`

```jsx
<SnackbarConsumer>
    ({    
        showMessage,
        showErrorMessage,
        showSuccessMessage,
        showWarningMessage,
        showInfoMessage
        snackbarRef 
    })=> (
        <></>
    )
</SnackbarConsumer>
```

### Customization

- Any Customization to the material theme will affect the Snackbar.

- You can use the `snackbarRef` to call setter methods that change the styling and the positioning.

- You can pass props to the `SnackbarProvider`

#### Mui Snackbar Component Props
- [`DOCS`](https://mui.com/material-ui/react-snackbar/)
- [`API`](https://mui.com/material-ui/api/snackbar/)

```javascript
    snackbarRef?.current?.setSnackbarProps(...)
```
#### Mui Alert Component Props
- [`DOCS`](https://mui.com/material-ui/react-alert/)
- [`API`](https://mui.com/material-ui/api/alert/)
```javascript
    snackbarRef?.current?.setAlertProps(...)
```
#### Mui AlertTitle Component Props
- [`DOCS`](https://mui.com/material-ui/react-alert/#description)
- [`API`](https://mui.com/material-ui/api/alert-title/)
  
```javascript
    snackbarRef?.current?.setAlertTitleProps(...)
```
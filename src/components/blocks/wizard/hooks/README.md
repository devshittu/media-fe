
 # useStepCompletion
 To use this useStepCompletion
 
  ```js 
  const asyncOnCompleted = useCallback(async () => {
    // Perform any asynchronous operations here
  }, []);

  const [isCompleted, setIsCompleted] = useStepCompletion({
    trigger: someTrigger,
    onCompleted: asyncOnCompleted,
    initialValue: false,
  });
  
  ```

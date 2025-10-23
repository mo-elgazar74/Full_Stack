export function linting(): string {
  let message = 'Linting'; // prefer-const violation
  const unusedValue = 42; // no-unused-vars violation
  const info: any = { status: true }; // no-explicit-any warning

  if (info.status == true) {
    console.log('Status active'); // no-console warning
  }

  function emptyHandler() {} // no-empty-function warning

  emptyHandler();
  return message;
}
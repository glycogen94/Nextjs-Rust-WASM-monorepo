use wasm_bindgen_test::*;
use wasm_lib::*;

wasm_bindgen_test_configure!(run_in_browser);

#[wasm_bindgen_test]
fn test_add() {
    assert_eq!(add(2, 3), 5);
    assert_eq!(add(0, 0), 0);
    assert_eq!(add(100, 100), 200);
}

#[wasm_bindgen_test]
fn test_greet() {
    assert_eq!(greet("WebAssembly"), "Hello from Rust, WebAssembly!");
}

#[wasm_bindgen_test]
fn test_fibonacci_fast() {
    assert_eq!(fibonacci_fast(0), 0);
    assert_eq!(fibonacci_fast(1), 1);
    assert_eq!(fibonacci_fast(2), 1);
    assert_eq!(fibonacci_fast(3), 2);
    assert_eq!(fibonacci_fast(10), 55);
}

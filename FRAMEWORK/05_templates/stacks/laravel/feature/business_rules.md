# Laravel Feature Business Rules: [FEATURE_NAME]

# 1. Validation & Domain Constraints
1. **[RULE_NAME]:**
   - *Condition:* `[Condition checked in Form Request or Action]`
   - *Error Handling:* `[Throws Domain Exception / returns 422]`

---

## 2. Financial Calculations
```php
// Handled via MoneyPHP
$subtotal = Money::USD(5000);
$discount = $subtotal->multiply('0.10');
$total = $subtotal->subtract($discount);
```

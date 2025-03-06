# 🛠️ validations-kaike

Uma biblioteca leve para validação de **emails, bilhetes de identidade (BI), IBANs e passaportes**. 🚀

## 📦 Instalação

Instale a biblioteca usando **npm**, **yarn** ou **pnpm**:

```sh
# Com npm
npm install validations-kaike

# Com yarn
yarn add validations-kaike

# Com pnpm
pnpm add validations-kaike
```

## 🚀 Como Usar

Importe os validadores individuais ou a função `validate` para validar vários inputs ao mesmo tempo.

### ✅ Validação única

```ts
import { IsEmail, IsBi, IsIban, IsPassport } from "validations-kaike";

console.log(IsEmail("teste@email.com"));
// { message: "Valid email", value: "teste@email.com" }

console.log(IsBi("123456789LA001"));
// { message: "Valid identity card", value: "123456789LA001" }

console.log(IsIban("AO06123456789012345678901"));
// { message: "Valid Iban", value: "AO06123456789012345678901" }

console.log(IsPassport("A1234567"));
// { message: "Valid passport", value: "A1234567" }
```

Se a entrada for inválida, a função **lança um erro**.

```ts
try {
  console.log(IsEmail("email_invalido"));
} catch (error) {
  console.error(error.message); // "Invalid email"
}
```

---

### 🔄 Validação múltipla com `validate`

Use `validate()` para validar vários inputs de uma vez.

```ts
import { validate, IsEmail, IsBi, IsIban, IsPassport } from "validations-kaike";

validate([
  { fn: IsEmail, input: "teste@email.com" },
  { fn: IsBi, input: "123456789LA001" },
  { fn: IsIban, input: "AO06123456789012345678901" },
  { fn: IsPassport, input: "A1234567" }
])
  .then(console.log)
  .catch(console.error);
```

📌 **Se todas as validações passarem**, o `validate` retorna um array com os resultados:

```ts
[
  { message: "Valid email", value: "teste@email.com" },
  { message: "Valid identity card", value: "123456789LA001" },
  { message: "Valid Iban", value: "AO06123456789012345678901" },
  { message: "Valid passport", value: "A1234567" }
]
```

❌ **Se alguma validação falhar**, `validate` rejeita a promessa com um array de erros:

```ts
validate([
  { fn: IsEmail, input: "email_invalido" }
]).catch(console.error);
```

Saída:
```ts
[ { message: "Invalid email", value: "email_invalido" } ]
```

---

## 📜 Métodos Disponíveis

| Método       | Valida                  | Exemplo Válido     | Exemplo Inválido |
|-------------|-------------------------|---------------------|-------------------|
| `IsEmail`   | Email                    | `teste@email.com`  | `email_invalido` |
| `IsBi`      | Bilhete de identidade    | `123456789LA001`   | `12345ABC` |
| `IsIban`    | IBAN                     | `AO06123456789012345678901` | `123456` |
| `IsPassport`| Passaporte               | `A1234567`         | `XYZ12` |

---

## 📄 Licença

MIT © 2025 - [Teu Nome](https://github.com/seuusuario)


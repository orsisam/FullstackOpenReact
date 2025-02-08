# React - FullstackOpen

## Part 1
### C. Component state, event handlers
#### Component helper function
Kita mulai dengan contoh baru:
```javascript
const Hello = (props) => {
  return (
    <div>
      <p>
        Hello {props.name}, you are {props.age} years old
      </p>
    </div>
  )
}

const App = () => {
  const name = 'Peter'
  const age = 10

  return (
    <div>
      <h1>Greetings</h1>
      <Hello name="Maya" age={26 + 10} />
      <Hello name={name} age={age} />
    </div>
  )
}
```

#### Component Helper Functions
Mari kita kembangkan komponen Hello kita sehingga bisa menerka tahun lahir orang yang disapa:
```javascript
const Hello = (props) => {

  const bornYear = () => {
    const yearNow = new Date().getFullYear()
    return yearNow - props.age
  }

  return (
    <div>
      <p>
        Hello {props.name}, you are {props.age} years old
      </p>

      <p>So you were probably born in {bornYear()}</p>
    </div>
  )
}
```
Alur logik yang digunakan untuk menerka tahun kelahiran dilatekkan pada fungsi yang terpisah yang akan dipanggil saat *rendering*.

#### Destructuring
Sebelum lanjut, kita akan memperhatikan feature *destructuring* nilai dari object dan array selama assignment.
Pada kode sebelumnya kita melewatkan data ke komponen sebagai `props.name` dan `props.age`.

Dikarenakan *props* adalah object
```javascript
props = {
  name: 'Arto Hellas',
  age: 35,
}
```
kita bisa mempersingkat komponen kita dengan menetapkan nilai dari properti secara langsung ke dalam dua variable `name` dan `age` yang mana selanjutnya kita bisa menggunakan pada koded kita:
```javascript
const Hello = (props) => {

  const name = props.name
  const age = props.age


  const bornYear = () => new Date().getFullYear() - age

  return (
    <div>

      <p>Hello {name}, you are {age} years old</p>
      <p>So you were probably born in {bornYear()}</p>
    </div>
  )
}
```
Catat bahwa kita juga memanfaatkan sintaks yang lebih sederhana untuk *arrow function* ketika mendefinisikan function `bornYear`. Jika sebuah *arrow function* hanya berisi *expression* tunggal maka kita hanya pelu mengetikkannya dalam satu baris tanpa kurung kurawal. Pada bentuk ini, *arrow function secara sederhana mengembalikan hasil dari expression tunggal.

Destructuring membuat assignment variable menjadi lebih mudah, karena kita bisa menggunakannya untuk mengekstrak dan mengumpulkannya dalam sebuah properti object ke dalam variable terpisah.

```javascript
const Hello = (props) => {

  const { name, age } = props
  const bornYear = () => new Date().getFullYear() - age

  return (
    <div>
      <p>Hello {name}, you are {age} years old</p>
      <p>So you were probably born in {bornYear()}</p>
    </div>
  )
}
```

Ketika object yang sedang kita *destructuring* punya nilai

```javascript
props = {
  name: 'Arto Hellas',
  age: 35,
}
```

*expression* `const { name, age } = props` memberikan nilai 'Arto Hellas" pada `name` dan 35 pada `age`.

Selanjutnya kita bisa *destructuring* seperti berikut
```javascript
const Hello = ({ name, age }) => {
  const bornYear = () => new Date().getFullYear() - age

  return (
    <div>
      <p>
        Hello {name}, you are {age} years old
      </p>
      <p>So you were probably born in {bornYear()}</p>
    </div>
  )
}
```


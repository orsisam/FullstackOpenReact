# Part 2
Pada bab ini pertama kita akan melihat bagaimana me-render *data collection*  seperti daftar nama ke layar. Setelah ini, kita menginspeksi bagaimana pengguna bisa men-submit data ke aplikasi React menggunakan form HTML. Kemudian kita fokus ke bagaimana kode JavaScript pada browser bisa mendapatkan dan menangani data yang tersimpan pada *backend server*. Dan yang terkahir kita akan memperhatikan beberapa cara sederhana menambahkan CSS ke aplikasi.

## Rendering a Collection, Modules
### Rendering Collections
Kita mulai dengan membuat aplikasi seperti part 0. Lakukan dengan menjalankan perintah `npm create vite@latest application-name -- --template react`.

Ubah file *App.jsx* seperti berikut:

```javascript
const App = (props) => {
  const { notes } = props

  return (
    <div>
      <h1>Notes</h1>
      <ul>
        <li>{notes[0].content}</li>
        <li>{notes[1].content}</li>
        <li>{notes[2].content}</li>
      </ul>
    </div>
  )
}

export default App
```

Dan file *main.jsx* seperti berikut:

```javascript
import ReactDOM from 'react-dom/client'
import App from './App'

const notes = [
  {
    id: 1,
    content: 'HTML is easy',
    important: true
  },
  {
    id: 2,
    content: 'Browser can execute only JavaScript',
    important: false
  },
  {
    id: 3,
    content: 'GET and POST are the most important methods of HTTP protocol',
    important: true
  }
]

ReactDOM.createRoot(document.getElementById('root')).render(
  <App notes={notes} />
)
```

Tiap *note*/catatan berisi text, nilai `boolean` untuk memberi tanda apakah dikatgorikan sebagai penting atau tidak, dan juga *id* unik.

Tiap catatan di-render dengan cara *hardcoded*, yakni kita mengakses tiap elemen secara manual satu demi satu.

```javascript
<li>{notes[1].content}</li>
```

Tentu saja hal ini akan sulit jika sebuah datanya banyak. Kita bisa memperbaikinya dengan men-generate tiap elemen menggunakan functin [*map*](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map).

```javascript
notes.map(note => <li>{note.content}</li>)
```

yang kemudian bisa diletakkan di antara tag `<ul>`.

```javascript
const App = (props) => {
  const { notes } = props

  return (
    <div>
      <h1>Notes</h1>

      <ul>
        {notes.map(note => <li>{note.content}</li>)}
      </ul>
    </div>
  )
}
```

### Key-atttribute
Meskipun apikasi terlihat berjalan namun sebenernya terdapat error ketika kita buka console.

![](https://i.imgur.com/wXNHe5v.png)

Sebagaimana error yang ditampilkan, item list yang mana elemen yang di-generate oleh `map`, tiap elemen tersebut harus memiliki nilai *key* unik (atribute dengan nama *key*).

Jadi kita tambahkan key dengan nilai dari id:

```javascript
const App = (props) => {
  const { notes } = props

  return (
    <div>
      <h1>Notes</h1>
      <ul>
        {notes.map(note => 

          <li key={note.id}>
            {note.content}
          </li>
        )}
      </ul>
    </div>
  )
}
```

Dan pesan error hilang.

React menggunakan atribute key object dalam sebuah array untuk menentukan bagaimana memperbarui tampilan yang digenerate ketika komponen di-render ulang. Bisa dibaca pada [React documentation](https://react.dev/learn/preserving-and-resetting-state#option-2-resetting-state-with-a-key).


### Map
Memahami cara kerja method array `map` adalah sangat penting untuk keseluruhan pelatihan ini.

Aplikasi berisi sebuah array dinamakan `notes`:

```javascript
const notes = [
  {
    id: 1,
    content: 'HTML is easy',
    important: true
  },
  {
    id: 2,
    content: 'Browser can execute only JavaScript',
    important: false
  },
  {
    id: 3,
    content: 'GET and POST are the most important methods of HTTP protocol',
    important: true
  }
]
```

Mari berhenti sejenak dan kita bahas bagaimana `map` bekerja.

Jika kode berikut ditambahkan, katakan lah pada akhir file:

```javascript
const result = notes.map(note => note.id)
console.log(result)
```

`[1, 2, 3]` akan dicetak ke console. `map` selalu menghasilkan array baru, elemen-elemen terseebut dibuat dari elemen dari array aslinya dengan melakukan *mapping*. Menggunakan function yang diberikan sebagai parameter ke method `map`.

Function tersebut adalah:

```javascript
note => note.id
```

Bentuk lengkap seperti berikut:

```javascript
(note) => {
  return note.id
}
```

Fungsi tersebut mendapatkan `note` sebagai parameter dan mengembalikan nilai dari *field* id.

Jika kita ubah perintah sebagaimana berikut:

```javascript
const result = notes.map(note => note.content)
```

akan memberikan kita array yang berisi *contents* dari notes.

Ini hampir mendekati kode react yang kita gunakan:

```javascript
notes.map(note =>
  <li key={note.id}>
    {note.content}
  </li>
)
```

yang mana men-*generate* tag *li* yang berisi *contents* dari notes pada tiap object note.

Dikarenakan parameter fungsi dilewatkan ke method `map` -

```javascript
note => <li key={note.id}>{note.content}</li>
```

digunakan untuk menampilkan elemen, nilai dari variabel harus dirender di dalam kurung kurawal.


### Anti-pattern: Array Indexes as Keys
Kita bisa saja membuat pesan error pada console hilang dengan menggunakan index array sebagai key. Index bisa didapatkan dengan memberikan parameter ke 2 pada fungsi *callback* pada method `map`.

```javascript
notes.map((note, i) => ...)
```

Ketika dipanggil seperti di atas, `i` berisi nilai dari index posisi pada array notes.

Hal ini bisa diterapkan pada kode menjadi seperti ini:

```javascript
<ul>
  {notes.map((note, i) => 
    <li key={i}>
      {note.content}
    </li>
  )}
</ul>
```

Bagaimanapun, hal ini tidak direkomendasikan dan bias memunculkan masalah yang tidak diinginkan.

Silahkan baca pada [artikel berikut](https://robinpokorny.com/blog/index-as-a-key-is-an-anti-pattern/).

> *Pada artikel tersebut kita disarankan menggunakan uuid atau shortid untuk membuat random id. Namun, shortid telah ditandai sebagai deprecated dan tidak digunakan lagi. Pada javascript kita bisa menggunakan [nanoid](https://github.com/ai/nanoid/) sebagai penggantinya*.


### Refactoring Modules
Kita rapikan kode kita sedikit. Kita hanya tertarik dengan field `notes` pada props, jadi langsung menggunakan *destructuring* untuk mendapatkannya secara langsung.

```javascript
const App = ({ notes }) => {
  return (
    <div>
      <h1>Notes</h1>
      <ul>
        {notes.map(note => 
          <li key={note.id}>
            {note.content}
          </li>
        )}
      </ul>
    </div>
  )
}
```

Kita akan memisahkan tampilan sebuah note ke dalam komponen tersendiri.

```javascript
const Note = ({ note }) => {
  return (
    <li>{note.content}</li>
  )
}

const App = ({ notes }) => {
  return (
    <div>
      <h1>Notes</h1>
      <ul>

        {notes.map(note => 
          <Note key={note.id} note={note} />
        )}
      </ul>
    </div>
  )
}
```


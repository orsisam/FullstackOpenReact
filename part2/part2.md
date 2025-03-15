# Daftar Isi


# Part 2

Pada bab ini pertama kita akan melihat bagaimana me-render _data collection_ seperti daftar nama ke layar. Setelah ini, kita menginspeksi bagaimana pengguna bisa men-submit data ke aplikasi React menggunakan form HTML. Kemudian kita fokus ke bagaimana kode JavaScript pada browser bisa mendapatkan dan menangani data yang tersimpan pada _backend server_. Dan yang terkahir kita akan memperhatikan beberapa cara sederhana menambahkan CSS ke aplikasi.

## Rendering a Collection, Modules

### Rendering Collections

Kita mulai dengan membuat aplikasi seperti part 0. Lakukan dengan menjalankan perintah `npm create vite@latest application-name -- --template react`.

Ubah file _App.jsx_ seperti berikut:

```javascript
const App = (props) => {
  const { notes } = props;

  return (
    <div>
      <h1>Notes</h1>
      <ul>
        <li>{notes[0].content}</li>
        <li>{notes[1].content}</li>
        <li>{notes[2].content}</li>
      </ul>
    </div>
  );
};

export default App;
```

Dan file _main.jsx_ seperti berikut:

```javascript
import ReactDOM from 'react-dom/client';
import App from './App';

const notes = [
  {
    id: 1,
    content: 'HTML is easy',
    important: true,
  },
  {
    id: 2,
    content: 'Browser can execute only JavaScript',
    important: false,
  },
  {
    id: 3,
    content: 'GET and POST are the most important methods of HTTP protocol',
    important: true,
  },
];

ReactDOM.createRoot(document.getElementById('root')).render(
  <App notes={notes} />
);
```

Tiap _note_/catatan berisi text, nilai `boolean` untuk memberi tanda apakah dikatgorikan sebagai penting atau tidak, dan juga _id_ unik.

Tiap catatan di-render dengan cara _hardcoded_, yakni kita mengakses tiap elemen secara manual satu demi satu.

```javascript
<li>{notes[1].content}</li>
```

Tentu saja hal ini akan sulit jika sebuah datanya banyak. Kita bisa memperbaikinya dengan men-generate tiap elemen menggunakan functin [_map_](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map).

```javascript
notes.map((note) => <li>{note.content}</li>);
```

yang kemudian bisa diletakkan di antara tag `<ul>`.

```javascript
const App = (props) => {
  const { notes } = props;

  return (
    <div>
      <h1>Notes</h1>

      <ul>
        {notes.map((note) => (
          <li>{note.content}</li>
        ))}
      </ul>
    </div>
  );
};
```

### Key-atttribute

Meskipun apikasi terlihat berjalan namun sebenernya terdapat error ketika kita buka console.

![](https://i.imgur.com/wXNHe5v.png)

Sebagaimana error yang ditampilkan, item list yang mana elemen yang di-generate oleh `map`, tiap elemen tersebut harus memiliki nilai _key_ unik (atribute dengan nama _key_).

Jadi kita tambahkan key dengan nilai dari id:

```javascript
const App = (props) => {
  const { notes } = props;

  return (
    <div>
      <h1>Notes</h1>
      <ul>
        {notes.map((note) => (
          <li key={note.id}>{note.content}</li>
        ))}
      </ul>
    </div>
  );
};
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
    important: true,
  },
  {
    id: 2,
    content: 'Browser can execute only JavaScript',
    important: false,
  },
  {
    id: 3,
    content: 'GET and POST are the most important methods of HTTP protocol',
    important: true,
  },
];
```

Mari berhenti sejenak dan kita bahas bagaimana `map` bekerja.

Jika kode berikut ditambahkan, katakan lah pada akhir file:

```javascript
const result = notes.map((note) => note.id);
console.log(result);
```

`[1, 2, 3]` akan dicetak ke console. `map` selalu menghasilkan array baru, elemen-elemen terseebut dibuat dari elemen dari array aslinya dengan melakukan _mapping_. Menggunakan function yang diberikan sebagai parameter ke method `map`.

Function tersebut adalah:

```javascript
(note) => note.id;
```

Bentuk lengkap seperti berikut:

```javascript
(note) => {
  return note.id;
};
```

Fungsi tersebut mendapatkan `note` sebagai parameter dan mengembalikan nilai dari _field_ id.

Jika kita ubah perintah sebagaimana berikut:

```javascript
const result = notes.map((note) => note.content);
```

akan memberikan kita array yang berisi _contents_ dari notes.

Ini hampir mendekati kode react yang kita gunakan:

```javascript
notes.map((note) => <li key={note.id}>{note.content}</li>);
```

yang mana men-_generate_ tag _li_ yang berisi _contents_ dari notes pada tiap object note.

Dikarenakan parameter fungsi dilewatkan ke method `map` -

```javascript
(note) => <li key={note.id}>{note.content}</li>;
```

digunakan untuk menampilkan elemen, nilai dari variabel harus dirender di dalam kurung kurawal.

### Anti-pattern: Array Indexes as Keys

Kita bisa saja membuat pesan error pada console hilang dengan menggunakan index array sebagai key. Index bisa didapatkan dengan memberikan parameter ke 2 pada fungsi _callback_ pada method `map`.

```javascript
notes.map((note, i) => ...)
```

Ketika dipanggil seperti di atas, `i` berisi nilai dari index posisi pada array notes.

Hal ini bisa diterapkan pada kode menjadi seperti ini:

```javascript
<ul>
  {notes.map((note, i) => (
    <li key={i}>{note.content}</li>
  ))}
</ul>
```

Bagaimanapun, hal ini tidak direkomendasikan dan bias memunculkan masalah yang tidak diinginkan.

Silahkan baca pada [artikel berikut](https://robinpokorny.com/blog/index-as-a-key-is-an-anti-pattern/).

> _Pada artikel tersebut kita disarankan menggunakan uuid atau shortid untuk membuat random id. Namun, shortid telah ditandai sebagai deprecated dan tidak digunakan lagi. Pada javascript kita bisa menggunakan [nanoid](https://github.com/ai/nanoid/) sebagai penggantinya_.

### Refactoring Modules

Kita rapikan kode kita sedikit. Kita hanya tertarik dengan field `notes` pada props, jadi langsung menggunakan _destructuring_ untuk mendapatkannya secara langsung.

```javascript
const App = ({ notes }) => {
  return (
    <div>
      <h1>Notes</h1>
      <ul>
        {notes.map((note) => (
          <li key={note.id}>{note.content}</li>
        ))}
      </ul>
    </div>
  );
};
```

Kita akan memisahkan tampilan sebuah note ke dalam komponen tersendiri.

```javascript
const Note = ({ note }) => {
  return <li>{note.content}</li>;
};

const App = ({ notes }) => {
  return (
    <div>
      <h1>Notes</h1>
      <ul>
        {notes.map((note) => (
          <Note key={note.id} note={note} />
        ))}
      </ul>
    </div>
  );
};
```

Perhatikan atribut _key_ sekarang harus didefinisikan untuk komponen _Note_, bukan tag _li_ seperti sebelumnya.

Keseluruhan aplikasi React bisa ditulis dalam satu file saja. Namun pada pratiknya, dianjurkan memisahkannya tiap komponen per file.

## Forms

Kita akan lanjut mengembangkan aplikasi kita. Anda bisa mendapatkan aplikasi ini [di sini](https://github.com/fullstack-hy2020/part2-notes-frontend/tree/part2-1).

### Menyimpan notes di dalam state komponen

Agar halaman terupdate ketika catatan baru ditambahkan cara terbaik adalah dengan menyimpan catatan pada _state_ komponen _App_. Jadi kita import _useState_ dan menggunakannya untuk mendefinisikan state yang diinisialisasi dari props yang diterima.

```javascript
import { useState } from 'react';
import Note from './components/Note';

const App = (props) => {
  const [notes, setNotes] = useState(props.notes);

  return (
    <div>
      <h1>Notes</h1>
      <ul>
        {notes.map((note) => (
          <Note key={note.id} note={note} />
        ))}
      </ul>
    </div>
  );
};

export default App;
```

Komponen menggunakan function `useState` untuk menginisialisasi state yang tersimpan pada `notes` dengan array catatan yang dilewatkan melalui props.

```javascript
const App = (props) => {
  const [notes, setNotes] = useState(props.notes);

  // ...
};
```

Kita bisa menggunakan _React Developer Tools_ untuk membuktikannya.

![react developer tools](https://i.imgur.com/t2t4arO.png)

Jika kita ingin mengawali dengan array kosong, kita harus menginisialisasi dengan array kosong, dan dikarenakan _props_ tidak digunakan kita bisa mengabaikan parameter `props` pada definsi fungsi.

```javascript
const App = () => {
  const [notes, setNotes] = useState([]);

  // ...
};
```

Mari kita tetap menggunakan nilai awal seperti pada contoh sebelumnya.

Selanjutnya, kita tambahkan form HTML pada komponen yang akan digunakan untuk menambahkan catatan baru.

```javascript
const App = (props) => {
  const [notes, setNotes] = useState(props.notes);

  const addNote = (event) => {
    event.preventDefault();
    console.log('button clicked', event.target);
  };

  return (
    <div>
      <h1>Notes</h1>
      <ul>
        {notes.map((note) => (
          <Note key={note.id} note={note} />
        ))}
      </ul>

      <form onSubmit={addNote}>
        <input />
        <button type='submit'>save</button>
      </form>
    </div>
  );
};
```

Kita sudah menambahkan function `addNote` sebagai _event handler_ pada elemen form yang akan dipanggil ketika form di-submit, dengan cara menekan tombol submit.

```javascript
const addNote = (event) => {
  event.preventDefault();
  console.log('button clicked', event.target);
};
```

Parameter `event` adalah sebah _event_ yang memicu pemanggilan fungsi event handler:

Event handler segera memanggil method `event.preventDefault()`, yang akan mencegah aksi standar ketika _submitting_ form.

Target dari event tersimpan pada `event.target` ter-_log_ pada console:

![event on submit](https://i.imgur.com/hBP0KVg.png)

Target pada kasus ini adalah _form_ yang telah kita definsikan pada komponen kita.

Lalu bagaimana cara kita untuk mengakses data yang ada di dalam _input_ form?

### COntroller Element

Ada banyak cara untuk menyelesaikan ini; metode pertama yang akan kita pelajari adalah dengan menggunakan apa yang dinamakan [_controller component_](https://react.dev/reference/react-dom/components/input#controlling-an-input-with-a-state-variable).

Mari buat sebuah state baru dengan nama `newNote` untuk memnyimpan input yang disubmit pengguna dan kita set sebagai value dari input element tersebut:

```javascript
const App = (props) => {
  const [notes, setNotes] = useState(props.notes);

  const [newNote, setNewNote] = useState('a new note...');

  const addNote = (event) => {
    event.preventDefault();
    console.log('button clicked', event.target);
  };

  return (
    <div>
      <h1>Notes</h1>
      <ul>
        {notes.map((note) => (
          <Note key={note.id} note={note} />
        ))}
      </ul>
      <form onSubmit={addNote}>
        <input value={newNote} />
        <button type='submit'>save</button>
      </form>
    </div>
  );
};
```

Text _placeholder_ yang tersimpan sebagai nilai awal dari state `newNote` nampan pada elemen _input_, namun _input_ text tidak bisa di-_edit_. Console menampikkan peringatan yang memberikan kita sebuah petunjuk apa yang mungkin salah:

![warning onChange](https://i.imgur.com/wffD5KQ.png)

Karena kita memberikan state komponen App sebagai atribut nilai dari elemen input, komponen App saat ini mengontrol tingkah laku dari elemen input.

Agar memungkinkan untuk melakukan editing pada elemen input, kita harus mendaftarkan sebuah _event handler_ yang menyingkronkan perubahan yang dibuat pada input dengan state komponen.

```javascript
const App = (props) => {
  const [notes, setNotes] = useState(props.notes);
  const [newNote, setNewNote] = useState('a new note...');

  // ...

  const handleNoteChange = (event) => {
    console.log(event.target.value);
    setNewNote(event.target.value);
  };

  return (
    <div>
      <h1>Notes</h1>
      <ul>
        {notes.map((note) => (
          <Note key={note.id} note={note} />
        ))}
      </ul>
      <form onSubmit={addNote}>
        <input value={newNote} onChange={handleNoteChange} />
        <button type='submit'>save</button>
      </form>
    </div>
  );
};
```

Sekarang kita telah mendaftarkan sebuah event handler ke atribut `onChange` dari elemen input form:

```javascript
<input value={newNote} onChange={handleNoteChange} />
```

_Event handler_ dipanggil tiap kali terjadi perubahan pada elemen input. Fungsi event handler menerima object event sebagai parameter `event`.

```javascript
const handleNoteChange = (event) => {
  console.log(event.target.value);
  setNewNote(event.target.value);
};
```

Sekarang property `target` dari object event terhubung ke elemen input yang dikontrol, dan `event.target.value` merujuk ke nilai input dari elemen tersebut.

> **Catatan**: kita tidak perlu untuk memanggil method `event.preventDefault()` seperti yang kita lakukan pada event handler _onSubmit_. Hal ini dikarenakan tidak ada aksi default yang terjadi pada perubahan input, tidak seperti _form submission_.

Kita bisa memperhatikannya pada console untuk melihat bagaimana event handler dpanggil.

![onChange event handler](https://i.imgur.com/0YUa42l.png)

Atau kita bisa menggunakan React Dev Tools.

![onChange in React dev tools](https://i.imgur.com/P0D66Av.png)

Saat ini state `newNote` dari komponen App merefleksikan nilai saat ini dari input, yang berarti kita bisa menyelesaikan fungsi `addNote` untuk membuat note baru.

```javascript
const addNote = (event) => {
  event.preventDefault();
  const noteObject = {
    content: newNote,
    important: Math.random() < 0.5,
    id: String(notes.length + 1),
  };

  setNotes(notes.concat(noteObject));
  setNewNote('');
};
```

Pertama-tama kita buat object baru untuk catatan dengan nama `noteObject` yang akan menerima isinya dari state komponen `newNote`. _id_ dibuat dengan cara menghitung jumlah catatan. Metode ini bisa bekerja karena catan dianggap tidak pernah dihapus. Dengan bantuan `Math.random()` catatan kita punya kesempatan 50% ditandai sebagai penting.

Catatn baru ditambahkan ke daftar catatan menggunakan method array _concat_:

```javascript
setNotes(notes.concat(noteObject));
```

Method tersebut tidak akan merubah nilai awal catatan namunmembuat array baru.

Event handler juga mereset nilai dari elemen input yang dikontrol dengan memanggil fungsi `setNewNote` dari state dari `newNote`.

```javascript
setNewNote('');
```

### Filtering Displayed Elements

Mari kita tambahkan beberapa fungsionalitas pada aplikasi kita yang mengijinkan kita untuk menampilkan hanya catatan penting.

Mari kita tambahkan sebuah satet ke komponen App yang terus melacak catatan mana yang harus ditampilkan:

```javascript
const App = (props) => {
  const [notes, setNotes] = useState(props.notes);
  const [newNote, setNewNote] = useState('');

  const [showAll, setShowAll] = useState(true);

  // ...
};
```

Ubah komponen sehingga mampu menyimpan daftar semua catatan untuk ditampilkan ke dalam variabel `notesToShow`. Item-item pada daftar tersebut tergantung pada state komponen.:

```javascript
import { useState } from 'react';
import Note from './components/Note';

const App = (props) => {
  const [notes, setNotes] = useState(props.notes);
  const [newNote, setNewNote] = useState('');
  const [showAll, setShowAll] = useState(true);

  // ...

  const notesToShow = showAll
    ? notes
    : notes.filter((note) => note.important === true);

  return (
    <div>
      <h1>Notes</h1>
      <ul>
        {notesToShow.map((note) => (
          <Note key={note.id} note={note} />
        ))}
      </ul>
      // ...
    </div>
  );
};
```

Pendefinisian variabel `notesToShow` agak kompak.

```javascript
const notesToShow = showAll
  ? notes
  : notes.filter((note) => note.important === true);
```

Jika nilai dari `showAll` bernilai _false_, variabel `notesToShow` akan diberikan nilai daftar catatan yang mana punya properti `important` yang bernilai _true_. _Filtering_ dilakukan dengan bantuan methd array filter:

```javascript
notes.filter((note) => note.important === true);
```

OPerator perbandingannya terlihat redundant, karena nilai `note.important` kalau tidak _true_ atau _false_, artinya kita bisa menyederhanakannya:

```javascript
notes.filter((note) => note.important);
```

Kita menunjukkan operator perbandingan pertama kali untuk menekankan detail penting: Pada JavaScript `val1 == val2` tidak mesti memberikan hasil yang sesuai. Ketika melakukan perbandingan, lebih disarankan menggunakan `val1 === val2`.

Selanjutnya kita tambahkan fungsionalitas yang mengijinkan pengguna untuk _toggle_ state `showAll`.

perubahan tersebut seperti berikut:

```javascript
import { useState } from 'react';
import Note from './components/Note';

const App = (props) => {
  const [notes, setNotes] = useState(props.notes);
  const [newNote, setNewNote] = useState('');
  const [showAll, setShowAll] = useState(true);

  // ...

  return (
    <div>
      <h1>Notes</h1>
      <div>
        <button onClick={() => setShowAll(!showAll)}>
          show {showAll ? 'important' : 'all'}
        </button>
      </div>
      <ul>
        {notesToShow.map((note) => (
          <Note key={note.id} note={note} />
        ))}
      </ul>
      // ...
    </div>
  );
};
```


## b. Forms

### Menyimpan notes di dalam komponen _state_

Agar halaman terupdate ketika catatan baru ditambahkan cara terbaik adalah menyimpan catatan tersebut pada state dari komponen App. 
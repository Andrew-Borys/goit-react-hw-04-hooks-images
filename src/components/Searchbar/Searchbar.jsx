import { useState } from 'react';
import { Header, Form, Button, Input } from './Searchbar.styled';
import { ImSearch } from 'react-icons/im';

export default function Searchbar({ onSubmit }) {
  const [searchQuery, setSearchQuery] = useState('');

  const handleInputEntry = e => {
    setSearchQuery(e.target.value);
  };

  const handleSubmitForm = e => {
    e.preventDefault();
    onSubmit(searchQuery.toLowerCase().trim());
  };

  return (
    <Header>
      <Form onSubmit={handleSubmitForm}>
        <Button type="submit">
          <ImSearch size={24} />
        </Button>

        <Input
          // autofocus
          //  autocomplete="off"
          type="text"
          name="searchQuery"
          onChange={handleInputEntry}
          placeholder="Search images and photos"
        />
      </Form>
    </Header>
  );
}

// class Searchbar extends Component {
//   state = {
//     searchQuery: '',
//   };

//   handleSubmitForm = e => {
//     e.preventDefault();

//     this.props.onSubmit(this.state.searchQuery.toLowerCase().trim());
//   };

//   handleInputEntry = e => {
//     const { name, value } = e.currentTarget;
//     this.setState({
//       [name]: value,
//     });
//   };

//   render() {
// return (
//   <Header>
//     <Form onSubmit={this.handleSubmitForm}>
//       <Button type="submit">
//         <ImSearch size={24} />
//       </Button>

//       <Input
//         // autofocus
//         autocomplete="off"
//         type="text"
//         name="searchQuery"
//         value={this.state.inputValue}
//         onChange={this.handleInputEntry}
//         placeholder="Search images and photos"
//       />
//     </Form>
//   </Header>
// );
//   }
// }

// export default Searchbar;

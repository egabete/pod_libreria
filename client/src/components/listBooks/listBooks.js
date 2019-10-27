import React from "react";

export default class ListBooks extends React.Component {
  handleReturn = bookId => {
    const { drizzle, drizzleState } = this.props;
    const contract = drizzle.contracts.Libreria;

    // let drizzle know we want to call the `set` method with `value`
    contract.methods.returnBook.cacheSend(bookId, {
      from: drizzleState.accounts[0]
    });
  };

  render() {
    const myAddress = this.props.drizzleState.accounts[0];

    const booksRows = this.props.books.map(book => {
      return (
        <tr key={book.bookId}>
          <td>{book.bookId}</td>
          <td>{book.owner === myAddress ? "Es mio" : "Prestado"}</td>
          <td>
            {book.owner !== myAddress ? (
              <button
                onClick={() => {
                  this.handleReturn(book.bookId);
                }}
              >
                Devolver
              </button>
            ) : (
              ""
            )}
          </td>
        </tr>
      );
    });

    return (
      <div>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Estado</th>
              <th>Devolver</th>
            </tr>
          </thead>
          <tbody>{booksRows}</tbody>
        </table>
      </div>
    );
  }
}

import React from 'react';

function Footer() {
  const date = new Date().getFullYear();
  return (
    <footer className="p-4 flex justify-center items-center mt-auto">
      <h2 className=" uppercase tracking-widest text-center">Designed and Built by Kamil Kostka &copy; {date}</h2>
    </footer>
  );
}

export default Footer;

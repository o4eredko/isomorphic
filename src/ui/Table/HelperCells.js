import React from 'react';
import ImageCellView from 'src/ui/Table/ImageCell';
import DeleteCell from 'src/ui/Table/DeleteCell';
import EditableCell from 'src/ui/Table/EditableCell';
import FilterDropdown from 'src/ui/Table/FilterDropdown';

const DateCell = data => <p>{data.toLocaleString()}</p>;
const ImageCell = src => <ImageCellView src={src} />;
const LinkCell = (link, href) => <a href={href ? href : '#'}>{link}</a>;
const TextCell = text => <p>{text}</p>;

export {
  DateCell,
  ImageCell,
  LinkCell,
  TextCell,
  EditableCell,
  DeleteCell,
  FilterDropdown,
};

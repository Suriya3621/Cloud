import React from 'react';
import { Helmet } from 'react-helmet-async';

const HelmetConfig = ({ title, icon }) => (
  <Helmet>
    <title>{title}-Cloud Upload</title>
    <link rel="icon" type="image/png" href={icon} sizes="16x16" />
  </Helmet>
);

export default HelmetConfig;
import React, { useState } from 'react';
import Container from '@mui/material/Container';
import ProductTable from './ProductTable';
import ProductList from './ProductList';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Box from '@mui/material/Box';
import { useParams } from 'react-router-dom';
import { useDB, ProductInfo } from '../context/DBContext';
import { translateToChinese } from '../translator';
import RefreshIcon from '@mui/icons-material/Refresh';
import { toast } from 'react-toastify';

const ProductPage = () => {
  const [startDate, setStartDate] = useState(formateDate(new Date()));
  const [endDate, setEndDate] = useState(formateDate(new Date()));
  const { productName } = useParams<{ productName?: string }>();
  const db = useDB();
  const products = (db && db.products) || {};
  const currentProduct = (productName && products[productName]) || {};
  const xsWidth = '100vw';
  const mdWidth = `calc(${xsWidth} - 200px)`;
  const rows = [] as ProductInfo[];

  // filter data
  for (let date in currentProduct) {
    const curMonth = parseInt(date.slice(0, 2));
    const curDay = parseInt(date.slice(2, 4));

    const [startYear, startMonth, startDay] = startDate
      .split('-')
      .map((d) => parseInt(d));
    const [endYear, endMonth, endDay] = endDate
      .split('-')
      .map((d) => parseInt(d));

    if (
      compareDate(startMonth, startDay, curMonth, curDay) !== 1 &&
      compareDate(curMonth, curDay, endMonth, endDay) !== 1
    ) {
      for (let company in currentProduct[date]) {
        rows.push({ date, company, count: currentProduct[date][company] });
      }
    }
  }

  // return 0 if date1 === date2
  // return 1 if date1 > date2
  // return -1 if date1 < date2
  function compareDate(m1: number, d1: number, m2: number, d2: number) {
    if (m1 === m2 && d1 === d2) return 0;
    else if (m1 > m2 || (m1 === m2 && d1 > d2)) return 1;
    else return -1;
  }

  function formateDate(date: Date) {
    const year = date.getFullYear().toString();
    const month = date.getMonth() + 1;
    const strMonth = month < 10 ? '0' + month : month.toString();
    const day = date.getDate();
    const strDay = day < 10 ? '0' + day : date.toString();
    return `${year}-${strMonth}-${strDay}`;
  }

  function handleDateChanged(event: React.ChangeEvent<HTMLInputElement>) {
    const value = event.target.value;
    if (event.target.id === 'start') {
      setStartDate(value);
    } else {
      setEndDate(value);
    }
  }

  async function handleRefresh() {
    if (db) {
      await db.update();
      toast.success('更新成功');
    }
  }

  return (
    <Box
      sx={{
        width: {
          xs: xsWidth,
          md: mdWidth,
        },
        marginLeft: {
          xs: '0px',
          md: '200px',
        },
      }}
    >
      <ProductList />
      <Container>
        <Typography variant="h4" gutterBottom sx={{ margin: '1rem' }}>
          {productName && translateToChinese(productName)}
        </Typography>
        <Box sx={{ marginBottom: '1.5rem' }}>
          <Typography sx={{ display: 'inline-block', marginRight: '2rem' }}>
            開始日期 : &nbsp;
            <input
              type="date"
              id="start"
              value={startDate}
              onChange={handleDateChanged}
            />
          </Typography>
          <Typography sx={{ display: 'inline-block', marginRight: '2rem' }}>
            結束日期 : &nbsp;
            <input
              type="date"
              id="end"
              value={endDate}
              onChange={handleDateChanged}
            />
          </Typography>
          <IconButton aria-label="refresh" onClick={handleRefresh}>
            <RefreshIcon />
          </IconButton>
        </Box>
        <ProductTable rows={rows} />
        <GutterBottom />
      </Container>
    </Box>
  );
};

const GutterBottom = () => <div style={{ height: '1.5rem' }}></div>;

export default ProductPage;

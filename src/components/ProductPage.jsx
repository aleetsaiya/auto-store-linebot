import React, { useState } from 'react';
import Container from '@mui/material/Container';
import ProductTable from './ProductTable';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Box from '@mui/material/Box';
import { useParams } from 'react-router-dom';
import { useDB } from '../context/DBContext';
import { translateToChinese } from '../translator';
import RefreshIcon from '@mui/icons-material/Refresh';
import { toast } from 'react-toastify';

const ProductPage = () => {
  const [startDate, setStartDate] = useState(formateDate(new Date()));
  const [endDate, setEndDate] = useState(formateDate(new Date()));
  const params = useParams();
  const { update, products } = useDB();
  const currentProduct = products[params.productName];

  // filter data
  const rows = [];
  for (let date in currentProduct) {
    const curMonth = parseInt(date.slice(0, 2));
    const curDay = parseInt(date.slice(2, 4));

    let [startYear, startMonth, startDay] = startDate.split('-');
    let [endYear, endMonth, endDay] = endDate.split('-');

    [startMonth, startDay] = [parseInt(startMonth), parseInt(startDay)];
    [endMonth, endDay] = [parseInt(endMonth), parseInt(endDay)];

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
  function compareDate(m1, d1, m2, d2) {
    if (m1 === m2 && d1 === d2) return 0;
    else if (m1 > m2 || (m1 === m2 && d1 > d2)) return 1;
    else return -1;
  }

  function formateDate(date) {
    const year = date.getFullYear().toString();
    let month = date.getMonth() + 1;
    month = month < 10 ? '0' + month : month.toString();
    let day = date.getDate();
    day = day < 10 ? '0' + day : date.toString();
    return `${year}-${month}-${day}`;
  }

  function handleDateChanged(event) {
    const value = event.target.value;
    console.log({ value });
    if (event.target.id === 'start') {
      setStartDate(value);
    } else {
      setEndDate(value);
    }
  }

  async function handleRefresh() {
    await update();
    toast.success('更新成功');
  }

  return (
    <Container>
      <Typography variant="h4" gutterBottom sx={{ margin: '1rem' }}>
        {translateToChinese(params.productName)}
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
  );
};

const GutterBottom = () => <div style={{ height: '1.5rem' }}></div>;

export default ProductPage;

import { merge } from 'lodash';
import ReactApexChart from 'react-apexcharts';
// material
import { Grid, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Box, Card, CardHeader } from '@mui/material';
// utils
import { fNumber } from '../../../utils/formatNumber';
//
import { BaseOptionChart } from '../../charts';

import React, { useState, useEffect } from 'react';
import axios from "axios";
import { useTheme, styled } from '@mui/material/styles';

// ----------------------------------------------------------------------
Date.prototype.customFormat = function (formatString) {
    var YYYY, YY, MMMM, MMM, MM, M, DDDD, DDD, DD, D, hhhh, hhh, hh, h, mm, m, ss, s, ampm, AMPM, dMod, th;
    YY = ((YYYY = this.getFullYear()) + "").slice(-2);
    MM = (M = this.getMonth() + 1) < 10 ? ('0' + M) : M;
    MMM = (MMMM = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"][M - 1]).substring(0, 3);
    DD = (D = this.getDate()) < 10 ? ('0' + D) : D;
    DDD = (DDDD = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"][this.getDay()]).substring(0, 3);
    th = (D >= 10 && D <= 20) ? 'th' : ((dMod = D % 10) == 1) ? 'st' : (dMod == 2) ? 'nd' : (dMod == 3) ? 'rd' : 'th';
    formatString = formatString.replace("#YYYY#", YYYY).replace("#YY#", YY).replace("#MMMM#", MMMM).replace("#MMM#", MMM).replace("#MM#", MM).replace("#M#", M).replace("#DDDD#", DDDD).replace("#DDD#", DDD).replace("#DD#", DD).replace("#D#", D).replace("#th#", th);
    h = (hhh = this.getHours());
    if (h == 0) h = 24;
    if (h > 12) h -= 12;
    hh = h < 10 ? ('0' + h) : h;
    hhhh = hhh < 10 ? ('0' + hhh) : hhh;
    AMPM = (ampm = hhh < 12 ? 'am' : 'pm').toUpperCase();
    mm = (m = this.getMinutes()) < 10 ? ('0' + m) : m;
    ss = (s = this.getSeconds()) < 10 ? ('0' + s) : s;
    return formatString.replace("#hhhh#", hhhh).replace("#hhh#", hhh).replace("#hh#", hh).replace("#h#", h).replace("#mm#", mm).replace("#m#", m).replace("#ss#", ss).replace("#s#", s).replace("#ampm#", ampm).replace("#AMPM#", AMPM);
};

const arr =
    ['???????????????? ????????????:', '13.11.2021_08:00 - 15.11.2021_07:59',
    '???????? ???????????????????????? ????????????:', '????????: 15.11.2021. ??????????: 16:00',
    '???????????????????????? ????????????????????????:', '???????????????? 10',
    '?????????? ??????????????????, ??', '1000',
    '???????????? ?????????? ??????????????????, ????', '1400',
    '?????????????????????? ???????????????? ?????????? ??????????????????, ??/??', '3,2',
    '??????????????????????, ??/??:', '1000',
    '??????????????, ??/??:', '700,3',
    '????????????????????????, ??/??:', '1200',
    '??????, %', '85',
    '?????????? ??????????????, ??????', '30',
    '???????????????????? ????????????:', '4',
    '???????? ????????????:', '40',
    '???????? ???????????? ?????? ??????????????????:', '36',
    '?????????? ?? ???????????????? ??????????????:', '48',
    '?????? ?????????? ????????????, %','83,33333',
    '?????? ???????????? ?????? ??????????????????, %', '90',
        '?????????? ?????? ?????? ??????????????????, %', '75'];
const arr3 =
    ['?????????????????????? ?????????????????? 1, ??:', '70', '0',
        '?????????????????????? ?????????????????? 2, ??:', '70', '0',
        '?????????????????????? ?????????????????? 3, ??:', '70', '0',
        '?????????????????????? ?????????????????? 4, ??:', '70', '0',
        '?????????????????????? ?????????????????? 5, ??:', '70', '0',
        '?????????????????????? ?????????????????? 6, ??:', '70', '0',
        '?????????????????????? ?????????????????? 7, ??:', '70', '0',
        '?????????????????????? ?????????????????? 8, ??:', '70', '0',
        '?????????????????????? ??????????????????, ??:', '70', '0',
        '?????????????????????? ???????????????????? 1, ??:', '70', '0',
        '?????????????????????? ???????????????????? 2, ??:', '70', '0',
        '???????????????? ???????????????????? 1, ????/??????:', '20', '0',
        '???????????????? ???????????????????? 2, ????/??????:', '15', '0'];
const arr2 =
        ['?????????????? 1', '2', '3',
        '?????????????? 2', '2','3',
        '?????????????? 3', '1', '1',
        '?????????????? 4', '1', '1',
        '?????????????? 5', '0', '0',
        '?????????????? 6', '0', '0',
        '?????????????? 7', '0', '0',
        '?????????????? 8', '0', '0',
        '?????????????? 9', '0', '0',
        '?????????????? 10', '0', '0',
        '?????????????? 11', '0', '0',
        '?????????????? 12', '0', '0',
        '?????????????? 13', '0', '0',
        '?????????????? 14', '0', '0',
        '?????????????? 15', '0', '0',
        '?????????????? 16', '0', '0',
        '?????????????? 17', '0', '0',
        '?????????????? 18', '0', '0',
        '?????????????? 19', '0', '0',
        '?????????????? 20', '0', '0',
        '?????????????? 21', '0', '0',
        '?????????????? 22', '0', '0' ];

const today = new Date();

const data1 = [{
    name: '??????????',
    data: [1000, 708.3]
}];
const data2 = [{
    name: '????????',
    data: [40, 36]
}];

const data3 = [
    2,2,1,1
];

const data4 = [{
    name: '?????????? ??????????',
    type: 'area',
    data: [1000, 800, 1000, 0, 1000]
}];

const data5 = [{
    name: '?????????????????????? ??????????????????',
    type: 'area',
    data: [70, 90, 90, 0, 70]
},
    {
        name: '???????????????? ????????????????????',
        type: 'area',
        data: [10, 25, 10, 0, 20]
    },
    {
        name: '????????????????',
        type: 'area',
        data: [32, 32, 32, 0, 32]
    }];
const data6 = [{
    name: '?????????????????????? ??????????????????',
    type: 'area',
    data: [90, 80, 90, 0, 60]
},
    {
        name: '???????????????? ????????????????????',
        type: 'area',
        data: [10, 10, 25, 0, 10]
    },
    {
        name: '????????????????',
        type: 'area',
        data: [32, 32, 32, 0, 32]
    }];
const data7 = [{
    name: '?????????????????????? ??????????????????',
    type: 'area',
    data: [60, 70, 90, 0, 90]
    },
    {
        name: '???????????????? ????????????????????',
        type: 'area',
        data: [25, 10, 10, 0, 25]
    },
        {
            name: '????????????????',
            type: 'area',
            data: [32, 32, 32, 0, 32]
    }];
const data8 = [{
    name: '?????????????????????? ??????????????????',
    type: 'area',
    data: [90, 60, 90, 0, 60]
        },
    {
        name: '???????????????? ????????????????????',
        type: 'area',
        data: [10, 10, 10, 0, 10]
    },
            {
                name: '????????????????',
                type: 'area',
                data: [32, 32, 32, 0, 32]
            }];


export default function AppErrors({ loaddata, datafrom, datato }) {
    const chartOptions1 = merge(BaseOptionChart(), {
        plotOptions: {
            bar: {
                horizontal: false,
                columnWidth: '55%',
                endingShape: 'rounded'
            }
        },
        dataLabels: {
            enabled: false
        },
        stroke: {
            show: true,
            width: 2,
            colors: ['transparent']
        },
        xaxis: {
            categories: ['??????????????????????, ??/??', '?????????????? ??/??']
        },
        yaxis: {
            title: {
                text: '??/??'
            }
        },
        fill: {
            opacity: 1
        }
    });

    const chartOptions2 = merge(BaseOptionChart(), {
        plotOptions: {
            bar: {
                horizontal: false,
                columnWidth: '55%',
                endingShape: 'rounded'
            }
        },
        dataLabels: {
            enabled: false
        },
        stroke: {
            show: true,
            width: 2,
            colors: ['transparent']
        },
        xaxis: {
            categories: ['???????? ????????????', '???????? ???????????? ?????? ??????????????????']
        },
        yaxis: {
            title: {
                text: '??'
            }
        },
        fill: {
            opacity: 1
        }
    });

    const theme = useTheme();

    const chartOptions3 = merge(BaseOptionChart(), {
       
        labels: ['?????????????? 1', '?????????????? 2', '?????????????? 3', '?????????????? 4', '?????????????? 5', '?????????????? 6', '?????????????? 7', '?????????????? 8', '?????????????? 9', '?????????????? 10', '?????????????? 11', '?????????????? 12', '?????????????? 13', '?????????????? 14', '?????????????? 15', '?????????????? 16', '?????????????? 17', '?????????????? 18', '?????????????? 19', '?????????????? 20', '?????????????? 21', '?????????????? 22',],
        
        legend: { enabled: true, floating: true, horizontalAlign: 'center' },
        dataLabels: { enabled: true, dropShadow: { enabled: false } },
        tooltip: {
            fillSeriesColor: false,
            y: {
                formatter: (seriesName) => fNumber(seriesName),
                title: {
                    formatter: (seriesName) => `${seriesName}:`
                }
            }
        },
        plotOptions: {
            pie: { donut: { labels: { show: false } } }
        }
    });
    const LEGEND_HEIGHT = 150;
    const CHART_HEIGHT = 448;
    const ChartWrapperStyle = styled('div')(({ theme }) => ({
        height: CHART_HEIGHT,
        marginTop: theme.spacing(5),
        '& .apexcharts-canvas svg': { height: CHART_HEIGHT },
        '& .apexcharts-canvas svg,.apexcharts-canvas foreignObject': {
            overflow: 'visible'
        },
        '& .apexcharts-legend': {
            height: LEGEND_HEIGHT,
            alignContent: 'center',
            position: 'relative !important',
            borderTop: `solid 1px ${theme.palette.divider}`,
            top: `calc(${CHART_HEIGHT - LEGEND_HEIGHT}px) !important`
        }
    }));


    const chartOptions4 = merge(BaseOptionChart(), {
        stroke: { width: [3, 3] },
        plotOptions: { bar: { columnWidth: '30%', borderRadius: 3 } },
        fill: { type: ['gradient', 'gradient'] },
        colors: ['gray', '#2a6079'],
        labels: [
            '2021-03-02 13:10:30',
            '2021-03-02 16:10:30',
            '2021-03-02 18:10:30',
            '2021-03-02 20:10:30',
           '2021-03-02 24:10:30'
        ],
        xaxis: {
            type: 'text'
        },
        tooltip: {
            shared: true,
            intersect: false,
            y: {
                formatter: (y) => {
                    if (typeof y !== 'undefined') {
                        return `${y.toFixed(0)} ????????`;
                    }
                    return y;
                }
            }
        }
    });
    const chartOptions5 = merge(BaseOptionChart(), {
        stroke: { width: [3, 3] },
        plotOptions: { bar: { columnWidth: '30%', borderRadius: 3 } },
        fill: { type: ['gradient', 'gradient', 'gradient'] },
        colors: ['gray', 'blue','yellow'],
        labels: [
            '2021-03-02 13:10:30',
            '2021-03-02 16:10:30',
            '2021-03-02 18:10:30',
            '2021-03-02 20:10:30',
            '2021-03-02 24:10:30'
        ],
        xaxis: {
            type: 'text'
        },
        tooltip: {
            shared: true,
            intersect: false,
            y: [{
                formatter: function (y) {
                    if (typeof y !== "undefined") {
                        return y.toFixed(0) + " ????????????????";
                    }
                    return y;

                }
            }, {
                formatter: function (y) {
                    if (typeof y !== "undefined") {
                        return y.toFixed(2) + " ????";
                    }
                    return y;

                }


                },
{
                    formatter: function (y) {
                        if (typeof y !== "undefined") {
                            return y.toFixed(2)/10 + " ??/c";
                        }
                        return y;

                    }


                }            ]
        }
    });

    return (
        <Grid container spacing={1}>
            <Grid item xs={12}>
                <Card>
                    <CardHeader title="????????????????????" subheader="" />
                    <Box sx={{ mx: 3 }} dir="ltr">
                        <Grid container spacing={1}>
                            <Grid item xs={6}>
                <TableContainer component={Paper} align="right">
                    <Table sx={{ minWidth: 600, maxWidth: 750}} size="small" aria-label="a dense table">
                        <TableBody>                           
                            <TableRow>
                                <TableCell align="right">{arr[0]}</TableCell>
                                <TableCell align="left">{datafrom} - {datato}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell align="right">{arr[2]}</TableCell>
                                                <TableCell align="left">{today.customFormat("#MM#/#DD#/#YYYY# #hhhh#:#mm#")}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell align="right">{arr[4]}</TableCell>
                                <TableCell align="left">{loaddata}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell align="right">{arr[6]}</TableCell>
                                <TableCell align="left">{arr[7]}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell align="right">{arr[8]}</TableCell>
                                <TableCell align="left">{arr[9]}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell align="right">{arr[10]}</TableCell>
                                <TableCell align="left">{arr[11]}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell align="right">{arr[12]}</TableCell>
                                <TableCell align="left">{arr[13]}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell align="right">{arr[14]}</TableCell>
                                <TableCell align="left">{arr[15]}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell align="right">{arr[16]}</TableCell>
                                <TableCell align="left">{arr[17]}</TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </TableContainer>
                            </Grid>
                            <Grid item xs={6}>
                <TableContainer component={Paper} >
                    <Table sx={{ minWidth: 500, maxWidth: 600 }} size="small" aria-label="a dense table">
                        <TableBody>
                            <TableRow>
                                <TableCell align="right">{arr[18]}</TableCell>
                                <TableCell align="left">{arr[19]}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell align="right">{arr[20]}</TableCell>
                                <TableCell align="left">{arr[21]}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell align="right">{arr[22]}</TableCell>
                                <TableCell align="left">{arr[23]}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell align="right">{arr[24]}</TableCell>
                                <TableCell align="left">{arr[25]}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell align="right">{arr[26]}</TableCell>
                                <TableCell align="left">{arr[27]}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell align="right">{arr[28]}</TableCell>
                                <TableCell align="left">{arr[29]}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell align="right">{arr[30]}</TableCell>
                                <TableCell align="left">{arr[31]}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell align="right">{arr[32]}</TableCell>
                                <TableCell align="left">{arr[33]}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell align="right">{arr[34]}</TableCell>
                                <TableCell align="left">{arr[35]}</TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                          </TableContainer>
                            </Grid>
                        </Grid>
                           </Box>
                </Card>
            </Grid>
            <Grid item xs={4}>
                <Card>
                    <CardHeader title="????????????????????????????????????" subheader="" />
                    <Box sx={{ mx: 3 }} dir="ltr">
                        <ReactApexChart options={chartOptions1} series={data1} type="bar" height={350} />
                    </Box>
                </Card>
            </Grid>
            <Grid item xs={4}>
                <Card>
                <CardHeader title="??????????????????" subheader="" />
                <Box sx={{ mx: 3 }} dir="ltr">
                <ReactApexChart options={chartOptions2} series={data2} type="bar" height={350} />
                      </Box>
                     </Card>
            </Grid>
            <Grid item xs={4}>
                <Card>
                    <CardHeader title="??????????" subheader="" />
                    <Box sx={{ mx: 3 }} dir="ltr">
                        <ReactApexChart options={chartOptions4} series={data4} type="line" height={350} />
                    </Box>
                </Card>
            </Grid>
            <Grid item xs={12}>
                <Card>
                    <CardHeader title="???????????????? ????????????????" subheader="" />
                    <Box sx={{ mx: 3 }} dir="ltr">
                        <TableContainer component={Paper} >
                            <Table sx={{ minWidth: 200, maxWidth: 300 }} size="small" aria-label="a dense table">
                                <TableBody>
                                    <TableRow>
                                        <TableCell align="right">?????????? ????????????????</TableCell>
                                        <TableCell align="left">6</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell align="right">???????????????????????? ????????????????</TableCell>
                                        <TableCell align="left">8</TableCell>
                                    </TableRow>                                  
                                </TableBody>
                            </Table>
                        </TableContainer>
                        <TableContainer component={Paper}>
                            <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell align="right">??????????????</TableCell>
                                        <TableCell align="right">????????????????????</TableCell>
                                        <TableCell align="right">??????????, ??</TableCell>
                                        <TableCell align="right">??????????????</TableCell>
                                        <TableCell align="right">????????????????????</TableCell>
                                        <TableCell align="right">??????????, ??</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    <TableRow>
                                        <TableCell align="right">{arr2[0]}</TableCell>
                                        <TableCell align="right">{arr2[1]}</TableCell>
                                        <TableCell align="right">{arr2[2]}</TableCell>
                                        <TableCell align="right">{arr2[33]}</TableCell>
                                        <TableCell align="right">{arr2[34]}</TableCell>
                                        <TableCell align="right">{arr2[35]}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell align="right">{arr2[3]}</TableCell>
                                        <TableCell align="right">{arr2[4]}</TableCell>
                                        <TableCell align="right">{arr2[5]}</TableCell>
                                        <TableCell align="right">{arr2[36]}</TableCell>
                                        <TableCell align="right">{arr2[37]}</TableCell>
                                        <TableCell align="right">{arr2[38]}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell align="right">{arr2[6]}</TableCell>
                                        <TableCell align="right">{arr2[7]}</TableCell>
                                        <TableCell align="right">{arr2[8]}</TableCell>
                                        <TableCell align="right">{arr2[39]}</TableCell>
                                        <TableCell align="right">{arr2[40]}</TableCell>
                                        <TableCell align="right">{arr2[41]}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell align="right">{arr2[9]}</TableCell>
                                        <TableCell align="right">{arr2[10]}</TableCell>
                                        <TableCell align="right">{arr2[11]}</TableCell>
                                        <TableCell align="right">{arr2[42]}</TableCell>
                                        <TableCell align="right">{arr2[43]}</TableCell>
                                        <TableCell align="right">{arr2[44]}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell align="right">{arr2[12]}</TableCell>
                                        <TableCell align="right">{arr2[13]}</TableCell>
                                        <TableCell align="right">{arr2[14]}</TableCell>
                                        <TableCell align="right">{arr2[45]}</TableCell>
                                        <TableCell align="right">{arr2[46]}</TableCell>
                                        <TableCell align="right">{arr2[47]}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell align="right">{arr2[15]}</TableCell>
                                        <TableCell align="right">{arr2[16]}</TableCell>
                                        <TableCell align="right">{arr2[17]}</TableCell>
                                        <TableCell align="right">{arr2[48]}</TableCell>
                                        <TableCell align="right">{arr2[49]}</TableCell>
                                        <TableCell align="right">{arr2[50]}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell align="right">{arr2[18]}</TableCell>
                                        <TableCell align="right">{arr2[19]}</TableCell>
                                        <TableCell align="right">{arr2[20]}</TableCell>
                                        <TableCell align="right">{arr2[51]}</TableCell>
                                        <TableCell align="right">{arr2[52]}</TableCell>
                                        <TableCell align="right">{arr2[53]}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell align="right">{arr2[21]}</TableCell>
                                        <TableCell align="right">{arr2[22]}</TableCell>
                                        <TableCell align="right">{arr2[23]}</TableCell>
                                        <TableCell align="right">{arr2[54]}</TableCell>
                                        <TableCell align="right">{arr2[55]}</TableCell>
                                        <TableCell align="right">{arr2[56]}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell align="right">{arr2[24]}</TableCell>
                                        <TableCell align="right">{arr2[25]}</TableCell>
                                        <TableCell align="right">{arr2[26]}</TableCell>
                                        <TableCell align="right">{arr2[57]}</TableCell>
                                        <TableCell align="right">{arr2[58]}</TableCell>
                                        <TableCell align="right">{arr2[59]}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell align="right">{arr2[27]}</TableCell>
                                        <TableCell align="right">{arr2[28]}</TableCell>
                                        <TableCell align="right">{arr2[29]}</TableCell>
                                        <TableCell align="right">{arr2[60]}</TableCell>
                                        <TableCell align="right">{arr2[61]}</TableCell>
                                        <TableCell align="right">{arr2[62]}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell align="right">{arr2[30]}</TableCell>
                                        <TableCell align="right">{arr2[31]}</TableCell>
                                        <TableCell align="right">{arr2[32]}</TableCell>
                                        <TableCell align="right">{arr2[63]}</TableCell>
                                        <TableCell align="right">{arr2[64]}</TableCell>
                                        <TableCell align="right">{arr2[65]}</TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Box>
                </Card>
            </Grid>
            <Grid item xs={6}>
                <Card>
                    <CardHeader title="????????????" subheader="" />
                    
                        <ChartWrapperStyle dir="ltr">
                            <ReactApexChart options={chartOptions3} series={data3} type="pie" height={300} />
                        </ChartWrapperStyle>
                    
                </Card>
            </Grid>
           
            <Grid item xs={6}>
                <Card>
                    <CardHeader title="?????????????????????? ??????????????????" subheader="" />
                    <Box sx={{ mx: 3 }} dir="ltr">
                        <TableContainer component={Paper}>
                            <Table sx={{ minWidth: 550 }} size="small" aria-label="a dense table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell align="left">??????????????</TableCell>
                                        <TableCell align="right">????????</TableCell>
                                        <TableCell align="right">??????</TableCell>                                        
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    <TableRow>
                                        <TableCell align="left">{arr3[0]}</TableCell>
                                        <TableCell align="right">{arr3[1]}</TableCell>
                                        <TableCell align="right">{arr3[2]}</TableCell>                                     
                                    </TableRow>
                                    <TableRow>
                                        <TableCell align="v">{arr3[3]}</TableCell>
                                        <TableCell align="right">{arr3[4]}</TableCell>
                                        <TableCell align="right">{arr3[5]}</TableCell>                                      
                                    </TableRow>
                                    <TableRow>
                                        <TableCell align="left">{arr3[6]}</TableCell>
                                        <TableCell align="right">{arr3[7]}</TableCell>
                                        <TableCell align="right">{arr3[8]}</TableCell>
                                      
                                    </TableRow>
                                    <TableRow>
                                        <TableCell align="left">{arr3[9]}</TableCell>
                                        <TableCell align="right">{arr3[10]}</TableCell>
                                        <TableCell align="right">{arr3[11]}</TableCell>
                                       
                                    </TableRow>
                                    <TableRow>
                                        <TableCell align="left">{arr3[12]}</TableCell>
                                        <TableCell align="right">{arr3[13]}</TableCell>
                                        <TableCell align="right">{arr3[14]}</TableCell>
                                        
                                    </TableRow>
                                    <TableRow>
                                        <TableCell align="left">{arr3[15]}</TableCell>
                                        <TableCell align="right">{arr3[16]}</TableCell>
                                        <TableCell align="right">{arr3[17]}</TableCell>
                                       
                                    </TableRow>
                                    <TableRow>
                                        <TableCell align="left">{arr3[18]}</TableCell>
                                        <TableCell align="right">{arr3[19]}</TableCell>
                                        <TableCell align="right">{arr3[20]}</TableCell>
                                       
                                    </TableRow>
                                    <TableRow>
                                        <TableCell align="left">{arr3[21]}</TableCell>
                                        <TableCell align="right">{arr3[22]}</TableCell>
                                        <TableCell align="right">{arr3[23]}</TableCell>
                                       
                                    </TableRow>
                                    <TableRow>
                                        <TableCell align="left">{arr3[24]}</TableCell>
                                        <TableCell align="right">{arr3[25]}</TableCell>
                                        <TableCell align="right">{arr3[26]}</TableCell>
                                        
                                    </TableRow>
                                    <TableRow>
                                        <TableCell align="left">{arr3[27]}</TableCell>
                                        <TableCell align="right">{arr3[28]}</TableCell>
                                        <TableCell align="right">{arr3[29]}</TableCell>
                                        
                                    </TableRow>
                                    <TableRow>
                                        <TableCell align="left">{arr3[30]}</TableCell>
                                        <TableCell align="right">{arr3[31]}</TableCell>
                                        <TableCell align="right">{arr3[32]}</TableCell>
                                        
                                    </TableRow>
                                    <TableRow>
                                        <TableCell align="left">{arr3[33]}</TableCell>
                                        <TableCell align="right">{arr3[34]}</TableCell>
                                        <TableCell align="right">{arr3[35]}</TableCell>

                                    </TableRow>
                                    <TableRow>
                                        <TableCell align="left">{arr3[36]}</TableCell>
                                        <TableCell align="right">{arr3[37]}</TableCell>
                                        <TableCell align="right">{arr3[38]}</TableCell>

                                    </TableRow>
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Box>
                </Card>
            </Grid>
            <Grid item xs={6}>
                <Card>
                    <CardHeader title="?????????????????? 1" subheader="" />
                    <Box sx={{ mx: 3 }} dir="ltr">
                        <ReactApexChart options={chartOptions5} series={data5} type="line" height={474} />
                    </Box>
                </Card>
            </Grid>
            <Grid item xs={6}>
                <Card>
                    <CardHeader title="?????????????????? 2" subheader="" />
                    <Box sx={{ mx: 3 }} dir="ltr">
                        <ReactApexChart options={chartOptions5} series={data6} type="line" height={474} />
                    </Box>
                </Card>
            </Grid>
            <Grid item xs={6}>
                <Card>
                    <CardHeader title="?????????????????? 3" subheader="" />
                    <Box sx={{ mx: 3 }} dir="ltr">
                        <ReactApexChart options={chartOptions5} series={data7} type="line" height={474} />
                    </Box>
                </Card>
            </Grid>
            <Grid item xs={6}>
                <Card>
                    <CardHeader title="?????????????????? 4" subheader="" />
                    <Box sx={{ mx: 3 }} dir="ltr">
                        <ReactApexChart options={chartOptions5} series={data8} type="line" height={474} />
                    </Box>
                </Card>
            </Grid>
        </Grid>
    );
}
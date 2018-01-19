/**
 * Created by Administrator on 2018/1/2.
 */
import Grid from './ui/grid.ts';
import PopupNumbers from './ui/popupnumbers.ts';

const grid = new Grid($('#container'))
grid.build();
grid.layout();

const popupnumber = new PopupNumbers($('#popupNumbers'));
grid.bindPopup(popupnumber);

$('#check').on('click', e => {
    if(grid.check()){
        alert('Congratulations！')
    };
});

$('#reset').on('click', e => {
    grid.reset();
});

$('#clear').on('click', e => {
    grid.clear();
});

$('#rebuild').on('click', e => {
    grid.reBuild();
});
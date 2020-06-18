# Stock Market Analysis

#### Описание Проекта
В то время, как борьба с туалетной бумагой и дезинфицирующими средствами для рук внезапно закончилась тем, что Costco больше не принимает доходность от этих когда-то так называемых горячих товаров, COVID-19 продолжает сеять хаос в мировой экономике в эти беспрецедентные времена; с февраля 2020 года по март 2020 года индекс Dow Jones Industrial Average (DJI) упал почти на 10000 пунктов.
DJI измеряет ежедневные движения цен 30 крупных американских компаний на NASDAQ и Нью-Йоркской фондовой бирже (NYSE) во всех основных секторах экономики, считается, что DJI является идеальным индексом для сравнения того, как восстанавливается фондовый рынок. По мере того как мир начнет ослаблять блокировки, будет показано, как каждая из 30 компаний справлялась и влияла на DJI

<img src='Images/README_plots/Dj_ohlc.png'>

<img src='Images/README_plots/Dj_line.png'>


- Получение набора данных от Yahoo Finance (DJI и его 30 компаний)
- Загрузка наборов данных в MongoDB с помощью Flask
- Запрос из базы данных для визуализации с помощью HTML / CSS и JavaScript:
    - Таблицы (jQuery)
    - Графики (Plotly)
    - API (Flask)
    - Чтение API / отображение данных (JavaScript)
- Создание веб-страниц

#### Datasets
```text
    Yahoo Finance: 
        ◦ https://finance.yahoo.com/chart/%5EDJ
        ◦ https://finance.yahoo.com/quote/%5EDJI?p=%5EDJI
```

|Symbol|Company  Name|Last Price (June 5, 2020)|
| -----------| :-------:| ---|
|PFE|Pfizer Inc.|35.99|
|JNJ|Johnson & Johnson|147.3|
|WMT|Walmart Inc.|121.56|
|MRK|Merck & Co., Inc.|82.26|
|VZ|Verizon Communications Inc.|57.74|
|DIS|The Walt Disney Company|124.82|
|NKE|NIKE, Inc.|102.71|
|GS|The Goldman Sachs Group, Inc.|217.92|
|PG|The Procter & Gamble Company|118.33|
|MCD|McDonald's Corporation|197.16|
|CSCO|Cisco Systems, Inc.|47.83|
|INTC|Intel Corporation|64.34|
|MSFT|Microsoft Corporation|187.2|
|HD|The Home Depot, Inc.|254.9|
|KO|The Coca-Cola Company|49.09|
|IBM|International Business Machines Corporation|132.06|
|WBA|Walgreens Boots Alliance, Inc.|45.35|
|AAPL|Apple Inc.|331.5|
|DOW|Dow Inc.|43.97|
|MMM|3M Company|167.41|
|AXP|American Express Company|109.73|
|V|Visa Inc.|199.61|
|JPM|JPMorgan Chase & Co.|111.23|
|UNH|UnitedHealth Group Incorporated|311.85|
|CVX|Chevron Corporation|100.81|
|CAT|Caterpillar Inc.|135.12|
|TRV|The Travelers Companies, Inc.|124.36|
|RTX|Raytheon Technologies Corporation|72.07|
|XOM|Exxon Mobil Corporation|53.08|
|BA|The Boeing Company|205.43|




function bar_flow(id) {
	// 基于准备好的dom，初始化echarts实例
	var myChart = echarts.init(document.getElementById(id));

	var option = {
		title: {
			text: '车流量'
		},
		color: ['#9ec2e0'],
		tooltip: {
			trigger: 'axis',
			axisPointer: { // 坐标轴指示器，坐标轴触发有效
				type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
			}
		},
		grid: {
			left: '3%',
			right: '4%',
			bottom: '3%',
			containLabel: true
		},
		xAxis: [{
			type: 'category',
			data: ['1:00', '1:05', '1:10', '1:15', '1:20', '1:25', '1:30', '1:35', '1:40', '1:45', '1:50', '1:55'],
			axisTick: {
				alignWithLabel: true
			}
		}],
		yAxis: [{
			type: 'value'
		}],
		series: [{
			name: '直接访问',
			type: 'bar',
			barWidth: '50%',
			data: ['7', '8', '6', '5', '4', '7', '8', '9', '10', '11', '22', '23']
		}]
	};

	// 使用刚指定的配置项和数据显示图表。
	myChart.setOption(option);
}

function line_speed(tit,x_data,ser_data,id,name) {
	// 基于准备好的dom，初始化echarts实例
	var myChart = echarts.init(document.getElementById(id));

	var option = {
		title: {
			text: tit
		},
		tooltip: {
			trigger: 'axis'
		},

		grid: {
			left: '3%',
			right: '4%',
			bottom: '3%',
			containLabel: true
		},
		toolbox: {
			feature: {
				saveAsImage: {}
			}
		},
		xAxis: {
			type: 'category',
			boundaryGap: false,
			data:x_data
		},
		yAxis: {
			type: 'value'
		},
		series: [{
			name: name,
			type: 'line',
			stack: '总量',
			data:ser_data
		}]
	};

	// 使用刚指定的配置项和数据显示图表。
	myChart.setOption(option);
}

function line_temperature(id){
	// 基于准备好的dom，初始化echarts实例
	var myChart = echarts.init(document.getElementById(id));

	option = {
    title: {
        text: '℃'
    },
    tooltip: {
        trigger: 'axis'
    },
    legend: {
        data:['大气温度','地表温度']
    },
    grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
    },
    toolbox: {
        feature: {
            saveAsImage: {}
        }
    },
    xAxis: {
        type: 'category',
        boundaryGap: false,
        data: ['1:00', '1:05', '1:10', '1:15', '1:20', '1:25', '1:30', '1:35', '1:40', '1:45', '1:50', '1:55']
    },
    yAxis: {
        type: 'value'
    },
    series: [
        {
            name:'大气温度',
            type:'line',
            stack: '总量',
            data:[17,18,16,18,19,21,20,18,19,18,15,12]
        },
        {
            name:'地表温度',
            type:'line',
            stack: '总量',
            data:[17,18,16,18,19,21,60,18,79,18,15,12]
        },
      
    ]
};

	// 使用刚指定的配置项和数据显示图表。
	myChart.setOption(option);
}

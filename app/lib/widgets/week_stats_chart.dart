import 'package:fitpredict/functions/get_current_week_dates.dart';
import 'package:fitpredict/models/stat.dart';
import 'package:fitpredict/theme.dart';
import 'package:fl_chart/fl_chart.dart';
import 'package:flutter/material.dart';
import 'package:hive_flutter/hive_flutter.dart';

class WeekStatsChart extends StatefulWidget {
  const WeekStatsChart({super.key});

  @override
  State<StatefulWidget> createState() => WeekStatsChartState();
}

class WeekStatsChartState extends State<WeekStatsChart> {
  List<int> _getWeekStats() {
    List<String> weekDates = getCurrentWeekDates();

    List<int> weekStats = [];
    for (var date in weekDates) {
      var stat = Hive.box<Stat>('stats').get(date);
      weekStats.add(stat?.steps ?? 0);
    }

    return weekStats;
  }

  @override
  Widget build(BuildContext context) {
    return Container(
      decoration: BoxDecoration(
        borderRadius: BorderRadius.circular(10),
        color: AppColors.primary.withOpacity(0.05),
        /* gradient: LinearGradient(
          colors: [
            AppColors.blue[950]!, //.withOpacity(0.5),
            AppColors.blue[800]!, //.withOpacity(0.5),
          ],
          begin: Alignment.bottomCenter,
          end: Alignment.topCenter,
        ), */
      ),
      padding: const EdgeInsets.all(20),
      child: Column(
        children: [
          Row(
            mainAxisSize: MainAxisSize.min,
            children: <Widget>[
              Icon(
                Icons.show_chart,
                color: AppColors.blue,
                size: 30,
              ),
              const SizedBox(width: 10),
              Text(
                'Passos na semana',
                style: TextStyle(
                  fontSize: 20,
                  fontWeight: FontWeight.w600,
                  color: Colors.grey[600]!,
                ),
              ),
            ],
          ),
          const SizedBox(height: 40),
          AspectRatio(
            aspectRatio: 1.70,
            child: ValueListenableBuilder(
              valueListenable: Hive.box<Stat>('stats').listenable(),
              builder: (context, value, child) {
                final weekStats = _getWeekStats();

                return BarChart(
                  BarChartData(
                    barTouchData: _barTouchData,
                    titlesData: _titlesData,
                    borderData: FlBorderData(
                      show: false,
                    ),
                    barGroups: weekStats
                        .asMap()
                        .map(
                          (i, e) => MapEntry(
                            i,
                            BarChartGroupData(
                              x: i,
                              barRods: [
                                BarChartRodData(
                                  toY: e.toDouble(),
                                  gradient: _barsGradient,
                                )
                              ],
                              showingTooltipIndicators: [0],
                            ),
                          ),
                        )
                        .values
                        .toList(),
                    gridData: const FlGridData(show: false),
                    alignment: BarChartAlignment.spaceAround,
                  ),
                );
              },
            ),
          ),
        ],
      ),
    );
  }

  BarTouchData get _barTouchData => BarTouchData(
        enabled: false,
        touchTooltipData: BarTouchTooltipData(
          tooltipBgColor: Colors.transparent,
          tooltipPadding: EdgeInsets.zero,
          tooltipMargin: 8,
          getTooltipItem: (
            BarChartGroupData group,
            int groupIndex,
            BarChartRodData rod,
            int rodIndex,
          ) {
            return BarTooltipItem(
              rod.toY.round().toString(),
              TextStyle(
                color: AppColors.blue[600],
                fontWeight: FontWeight.bold,
              ),
            );
          },
        ),
      );

  Widget _getTitles(double value, TitleMeta meta) {
    final style = TextStyle(
      color: AppColors.primary,
      fontWeight: FontWeight.bold,
      fontSize: 14,
    );
    String text;
    switch (value.toInt()) {
      case 0:
        text = 'D';
        break;
      case 1:
        text = 'S';
        break;
      case 2:
        text = 'T';
        break;
      case 3:
        text = 'Q';
        break;
      case 4:
        text = 'Q';
        break;
      case 5:
        text = 'S';
        break;
      case 6:
        text = 'S';
        break;
      default:
        text = '';
        break;
    }
    return SideTitleWidget(
      axisSide: meta.axisSide,
      space: 4,
      child: Text(text, style: style),
    );
  }

  FlTitlesData get _titlesData => FlTitlesData(
        show: true,
        bottomTitles: AxisTitles(
          sideTitles: SideTitles(
            showTitles: true,
            reservedSize: 30,
            getTitlesWidget: _getTitles,
          ),
        ),
        leftTitles: const AxisTitles(
          sideTitles: SideTitles(showTitles: false),
        ),
        topTitles: const AxisTitles(
          sideTitles: SideTitles(showTitles: false),
        ),
        rightTitles: const AxisTitles(
          sideTitles: SideTitles(showTitles: false),
        ),
      );

  LinearGradient get _barsGradient => LinearGradient(
        colors: [
          AppColors.primary,
          AppColors.blue[600]!,
        ],
        begin: Alignment.bottomCenter,
        end: Alignment.topCenter,
      );
}

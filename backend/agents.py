class RiskAgent:
    @staticmethod
    def calculate_risk(transit_time_mins):
        return min(100.0, round((transit_time_mins * 1.5), 2))

from src.services.dashboard_service import get_dashboard_stats


def get_progress(user_id: str):
    return get_dashboard_stats(user_id)
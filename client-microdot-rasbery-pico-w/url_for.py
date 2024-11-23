def url_for(endpoint, **values):
    """
    Generate a URL for a specific route (endpoint).
    
    :param endpoint: The route name (function name of the route)
    :param values: Additional parameters for query strings
    :return: Generated URL
    """
    base_url = '/' + endpoint  # Assume the function name matches the route
    if values:
        query_string = '&'.join(f"{key}={value}" for key, value in values.items())
        return f"{base_url}?{query_string}"
    return base_url

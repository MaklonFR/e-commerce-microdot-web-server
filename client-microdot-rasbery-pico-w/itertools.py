def count(start=0, step=1):
    while True:
        yield start
        start += step


def cycle(p):
    try:
        len(p)
    except TypeError:
        # len() is not defined for this type. Assume it is
        # a finite iterable so we must cache the elements.
        cache = []
        for i in p:
            yield i
            cache.append(i)
        p = cache
    while p:
        yield from p


def repeat(el, n=None):
    if n is None:
        while True:
            yield el
    else:
        for i in range(n):
            yield el


def chain(*p):
    for i in p:
        yield from i


def islice(p, start, stop=(), step=1):
    if stop == ():
        stop = start
        start = 0
    # TODO: optimizing or breaking semantics?
    if start >= stop:
        return
    it = iter(p)
    for i in range(start):
        next(it)

    while True:
        yield next(it)
        for i in range(step - 1):
            next(it)
        start += step
        if start >= stop:
            return


def tee(iterable, n=2):
    return [iter(iterable)] * n


def starmap(function, iterable):
    for args in iterable:
        yield function(*args)


def accumulate(iterable, func=lambda x, y: x + y):
    it = iter(iterable)
    try:
        acc = next(it)
    except StopIteration:
        return
    yield acc
    for element in it:
        acc = func(acc, element)
        yield acc
        
def groupby(iterable, key=None):
    # [k for k, g in groupby('AAAABBBCCDAABBB')] → A B C D A B
    # [list(g) for k, g in groupby('AAAABBBCCD')] → AAAA BBB CC D

    keyfunc = (lambda x: x) if key is None else key
    iterator = iter(iterable)
    exhausted = False

    def _grouper(target_key):
        nonlocal curr_value, curr_key, exhausted
        yield curr_value
        for curr_value in iterator:
            curr_key = keyfunc(curr_value)
            if curr_key != target_key:
                return
            yield curr_value
        exhausted = True

    try:
        curr_value = next(iterator)
    except StopIteration:
        return
    curr_key = keyfunc(curr_value)

    while not exhausted:
        target_key = curr_key
        curr_group = _grouper(target_key)
        yield curr_key, curr_group
        if curr_key == target_key:
            for _ in curr_group:
                pass


__version__ = '0.2.3'



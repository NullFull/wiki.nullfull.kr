

const name2url = name => {
    let s = name.split(' ').join('_')
    return s
}

const url2name = url => {
    let s = url.split('_').join(' ')
    return s
}


export {
    name2url, url2name
}
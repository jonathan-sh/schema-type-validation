
const isObject = (it) => it && typeof it === 'object';

const isArray = (it) => isObject(it) && it.length != undefined;

const getArrayType = (it) => 
{
    try 
    {
        const set = new Set(it.map(i => typeof i));
        return Array.from(set);
    } 
    catch (error) 
    {
        return it;
    }
}

const pushError = (path, required_type, send_type, erros = []) =>
{
    let erro =
    {
        path: path,
        required: required_type ,
        informed: send_type
    }
    erros.push(erro);
}

const getPath = (origin, key) => (origin==='') ? key : `${origin}.${key}`

const compare = (reference, to_check, origin='')  =>
{
    let errors = [];

    for (let key in reference) 
    {
        let v1 = reference[key];
        let v2 = to_check[key];
        let path = getPath(origin, key);
        if (isObject(v1)) 
        {
            if(isArray(v1))
            {
                let required = getArrayType(v1)+'';
                let informed = getArrayType(v2)+'';
                let is_same_type = required === informed;
                if(!is_same_type)
                {
                    let inf = isArray(v2)? `${informed}[]` : informed;
                    let res = isObject(v1[0]) ? [v1[0]] : `${required}[]`;
                    pushError(path, res, inf, errors);
                }
                else if (isArray(v2) && isObject(v2[0]))
                {
                    compare(v1, v2 || {}, path).forEach(it => 
                    {
                        pushError(it.path, it.required, it.informed, errors)
                    });
                } 
            }
            else
            {
                compare(v1, v2 || {}, path).forEach(it => 
                {
                    pushError(it.path, it.required, it.informed, errors)
                });
               
            }
        }
        else 
        {
            let required = typeof v1;
            let informed = typeof v2
            let is_same_type = required === informed;
            if(!is_same_type)
            {
                pushError(path, required, informed, errors);
            }
        }   
    }

    return errors;
}

module.exports = { pushError, isObject, compare, isArray, getArrayType }

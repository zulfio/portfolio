import hyperid from 'hyperid';

export function generateId() {
    const instance = hyperid();
    const id = instance();

    return hyperid.decode(id).uuid;
}
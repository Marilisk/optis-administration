import c from './../Header.module.scss';
import React, { ChangeEvent, FC, useState, useEffect } from 'react';

interface INameEditorProps {
    name: string
}

export const NameEditor:FC  <INameEditorProps> = ({name}:INameEditorProps) => {




    return <div>
        {name}
    </div>
}
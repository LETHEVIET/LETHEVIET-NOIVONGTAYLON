import React from 'react';
import PropTypes from 'prop-types';
import AvatarEditor from 'react-avatar-editor';

let imgsize = 150;

const AvatarCrop = ({ imageSrc, setEditorRef, scaleValue, onScaleChange }) => (
    <div>
        <div className="imageEditor">
            <div className="editorModalContent clearfix">
            <div className="cropCnt" style={{textAlign: "left"}}>
                <AvatarEditor 
                    width={imgsize}
                    height={imgsize*4/3}
                    image={imageSrc} 
                    border={0} 
                    scale={scaleValue} 
                    rotate={0} 
                    ref={setEditorRef} 
                    className="cropCanvas" 
                    style={{border: "3px solid #b2b2b2"}}
                />
            </div>
            </div>
        </div>
    </div>
);

AvatarCrop.propTypes = {
    //open: PropTypes.bool.isRequired,
    setEditorRef: PropTypes.func.isRequired,
    //onCrop: PropTypes.func.isRequired,
    scaleValue: PropTypes.number.isRequired,
    onScaleChange: PropTypes.func.isRequired,
};

export default AvatarCrop;
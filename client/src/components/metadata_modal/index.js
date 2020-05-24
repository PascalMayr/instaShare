import React, { useState }from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import update_metadata from '../../modules/update_metadata'
import MetadataInput from './components/metadat_input'
import Status from '../status'

const metdataHint = (key) => {
  if(key === 'tags'){
    return 'separate tags with a ,'
  }
  else{
    return ''
  }
}

const MetadataModal = (props) => {
  const {
    className,
    modal,
    toggle,
    filename,
    metadata,
    id,
    filenameCallback = () => {}
  } = props;
  metadata.filename = filename // asigning metadata as filename 
  const [status, setStatus] = useState(200)
  return (
    <div>
      <Modal isOpen={modal} toggle={toggle} className={className}>
        <ModalHeader toggle={toggle}>{filename}</ModalHeader>
        <ModalBody>
          {metadata && Object.keys(metadata).map(key  => {
            if(key !== 'user'){
            return(
              <div className="metadataInput" key={key}>{key} : &nbsp;
                {
                  key !== 'user' && 
                  <MetadataInput 
                    value={ metadata[key]}
                    onChange={(value) => {
                      // setting boolean value if a checkbox is checked
                      metadata[key] = value === 'true' ? true : value === 'false' ? false : value 
                      update_metadata(id, metadata, (data) => {
                        setStatus(202)
                        // user feedback
                        setTimeout(() => setStatus(200), 1000)
                        filenameCallback(data[0].filename)
                      },
                      (err) => {
                        setStatus(401)
                      })
                    }}
                    hint={metdataHint(key)}
                    key={key}
                  />
                }
              </div>
              )
            }
          })}
        </ModalBody>
        <ModalFooter>
          Status:&nbsp;
          <Status status={status} />
        </ModalFooter>
      </Modal>
    </div>
  );
}

export default MetadataModal;
import Image from 'next/image';
import { Input, Label } from 'reactstrap';
import AttachmentsDropdown from './AttachmentDropdown';

const AttachmentData = ({ state, dispatch, multiple, attachmentsData, refetch, redirectToTabs }) => {
  const ChoseImages = (e, item) => {
    if (multiple) {
      if (!e.target.checked) {
        let removeDuplicatesImage = [...state.selectedImage];
        removeDuplicatesImage = removeDuplicatesImage.filter((el) => {
          return el.key !== item.key;
        });
        dispatch({
          type: 'SELECTEDIMAGE',
          payload: state?.selectedImage?.length > 0 ? removeDuplicatesImage : [item],
        });
      } else {
        dispatch({
          type: 'SELECTEDIMAGE',
          payload: state?.selectedImage?.length > 0 ? [...state.selectedImage, item] : [item],
        });
      }
    } else {
      dispatch({ type: 'SELECTEDIMAGE', payload: [item] });
    }
  };
  return (
    <>
      {attachmentsData?.map((elem, i) => (
        <div key={elem.key}>
          <div className="library-box">
            <Input
              type="checkbox"
              id={elem.key}
              checked={
                state?.selectedImage?.length > 0
                  ? multiple
                    ? state.selectedImage.forEach((result) => (result.key == elem.key ? true : false))
                    : state.selectedImage.every((item) => item.key == elem.key)
                  : false
              }
              onChange={(e) => ChoseImages(e, elem)}
            />
            <Label htmlFor={elem.key}>
              <div className="ratio ratio-1x1">
                <Image src={elem?.url} className="img-fluid" alt={elem.key} width={100} height={100} />
              </div>
              {!redirectToTabs && <AttachmentsDropdown id={elem?.key} />}
            </Label>
          </div>
        </div>
      ))}
    </>
  );
};

export default AttachmentData;

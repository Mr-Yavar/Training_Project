import pathlib
from typing import Tuple
from PIL import Image
import torch 

class Food100L(torch.utils.data.Dataset):
    def  __init__(self
                  ,target_dir:str
                  ,transform=None):
        super().__init__()
        self.paths = list(pathlib.Path(target_dir/"data").glob("*/*.png"))
        self.gt_paths = list(pathlib.Path(target_dir/"gt").glob("*/*.png"))
        
        self.transform = transform
        
    def load_image(self,index:int) -> Image.Image:
        image_path = self.paths[index]
        return  Image.open(image_path)
    
    def load_image(self,path:pathlib.Path) -> Image.Image:
        return  Image.open(path)
    
    def __len__(self) -> int:
        return len(self.paths)
    
    def __getitem__(self, index)  -> Tuple[torch.Tensor,torch.Tensor]:
        image= self.load_image(index)
        label=self.load_image(self.gt_paths[index])
        return self.transform(image) if self.transform else image,self.transform(label) if self.transform else label
    
    
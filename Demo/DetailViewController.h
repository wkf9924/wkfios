//
//  DetailViewController.h
//  Demo
//
//  Created by WangKaifeng on 2016/11/25.
//  Copyright © 2016年 WangKaifeng. All rights reserved.
//

#import <UIKit/UIKit.h>

@interface DetailViewController : UIViewController

@property (strong, nonatomic) NSDate *detailItem;
@property (weak, nonatomic) IBOutlet UILabel *detailDescriptionLabel;

@end

